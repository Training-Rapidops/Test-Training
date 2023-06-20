const authorizeUser = require(
    '../internal-service-call/auth-service').authorizeUser;
const validateLink = require(
    '../internal-service-call/auth-service').validateLink;
const authorizeApplication = require(
    '../internal-service-call/auth-service').authorizeApplication;
const NoSuchLinkExist = require('../exceptions/no-such-link-exist.error');
const AuthorizationFailed = require('../exceptions/authorization-failed.error');
module.exports = function makeHttpCallabck({
  controller, byPassAuthCheck,
  byPassAppCheck, byPassLinkValidation,
}) {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: req.headers,
      app: req.app,
      logger: req.logger,
      uuid: req.uuid,
      linkname: req.headers['x-linkname'],
    };

    /*
      when x-user-id is passed in header then it is an internal service call
      You don't need to validate that request.

      When x-client-id is passed in header then we don't need to know
       query application to know it from access token

       Generally the headers x-user-id and x-client-id will only be
       passed by internal api calls, these headers will be added by our
       envoy filter in istio to identify the request. And our istio
       filter will remove these headers if passed from outside cluster
    */

    let linkDetails;
    if (httpRequest.linkname) {
      linkDetails = await validateLink({linkname: httpRequest.linkname});
      if (linkDetails) {
        httpRequest.linkname = linkDetails.linkName;
        httpRequest.headers['x-linkname'] = linkDetails.linkName;
      }
    }

    if (!httpRequest.headers['x-user-id']) {
      if (!req.query['byPassLinkValidation'] && !byPassLinkValidation) {
        try {
          if (!linkDetails) {
            await res.sendError(
                new NoSuchLinkExist(`Link ${httpRequest.linkname} not found`));
            return;
          }
        } catch (e) {
          req.logger.error(`Error while validateLink `, e);
          await res.sendError(
              new NoSuchLinkExist(`Link ${httpRequest.linkname} not found`));
          return;
        }
      }

      if (!byPassAuthCheck || req.headers['accesstoken']) {
        // Route is required to be checked for login
        if (!req.headers['accesstoken']) {
          await res.sendError(new AuthorizationFailed());
          return;
        }

        try {
          const authResponse = await authorizeUser({
            accessToken: req.headers['accesstoken'],
            linkname: httpRequest.linkname,
          });
          if (!authResponse) {
            await res.sendError(new AuthorizationFailed());
            return;
          } else {
            httpRequest.user = authResponse.user;
            httpRequest.application = authResponse.application;
          }
        } catch (e) {
          req.logger.error(`Error while authorizeUser`, e);
          await res.sendError(new AuthorizationFailed());
          return;
        }
      } else if (!byPassAppCheck) {
        if (!req.headers['clientid'] && !req.headers['clientsecret']) {
          await res.sendError(new AuthorizationFailed());
          return;
        }

        try {
          const authResponse = await authorizeApplication({
            clientId: req.headers['clientid'],
            clientSecret: req.headers['clientsecret'],
            linkname: httpRequest.linkname,
          });
          if (!authResponse) {
            await res.sendError(new AuthorizationFailed());
            return;
          } else {
            httpRequest.application = authResponse.application;
          }
        } catch (e) {
          req.logger.error(`Error while authorizeApplication `, e);
          await res.sendError(new AuthorizationFailed());
          return;
        }
      }
    } else {
      httpRequest.user = {
        id: httpRequest.headers['x-user-id'],
      };

      if (httpRequest.headers['x-client-id']) {
        httpRequest.application = {
          clientId: httpRequest.headers['x-client-id'],
        };
      }
    }
    try {
      const httpResponse = await controller(httpRequest);
      if (httpResponse.headers) {
        for (const header in httpResponse.headers) {
          if (Object.prototype.hasOwnProperty.call(httpResponse.headers,
              header,
          )) {
            res.setHeader(header, httpResponse.headers[header]);
          }
        }
      }
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
        await res.sendResponse(httpResponse.body, httpResponse.statusCode, null,
            httpResponse.headers ? httpResponse.headers['content-type'] : null,
        );
      } else if ([301, 302, 307, 308].indexOf(httpResponse.statusCode) !== -1) {
        await res.redirect(httpResponse.body, httpResponse.statusCode);
      } else {
        await res.sendError(httpResponse.body);
      }
    } catch (e) {
      req.logger.error(e);
      await res.sendError(e);
    }
  };
};
