const controllers = require('./controllers');
const makeHttpCallback = require('./http-server-callback/http-callback');
const config = require('./config');
const SERVICE_ENDPOINT = config.serviceEndpointPrefix;

class RestService {
  constructor(router, logger) {
    this.router = router;
    this.logger = logger;
  }

  start() {
    this.router.get('/', makeHttpCallback(
        {
          controller: controllers.greetAction,
          byPassAppCheck: true,
          byPassLinkValidation: true,
          byPassAuthCheck: true,
        }));
    this.router.get('/health-check', makeHttpCallback({
      controller: controllers.greetAction,
      byPassAuthCheck: true,
      byPassLinkValidation: true,
      byPassAppCheck: true,
    }));

    this.router.get(`${SERVICE_ENDPOINT}/`, makeHttpCallback(
        {
          controller: controllers.greetAction,
          byPassAppCheck: true,
          byPassLinkValidation: true,
          byPassAuthCheck: true,
        }));
    this.router.get(`${SERVICE_ENDPOINT}/health-check`, makeHttpCallback({
      controller: controllers.greetAction,
      byPassAuthCheck: true,
      byPassLinkValidation: true,
      byPassAppCheck: true,
    }));

    this.router.post(`${SERVICE_ENDPOINT}/v1/demo-app`, makeHttpCallback({
      controller: controllers.demoControllerAction,
    }));
  }

  getName() {
    return config.serviceName;
  }
}

module.exports = {RestService};
