module.exports = function makeAuthorizeApplication({axios, config}) {
  return async function authorizeApplication({clientId, clientSecret, linkname}) {
    return axios({
      method: 'get',
      url: `${config.serviceEndpoints.authenticationAndAuthorization}/oauth/authorize-application`,
      params: {clientId, clientSecret, linkname},
    }).then(function(response) {
      if (response.status === 200) {
        return response.data.Data;
      } else {
        return false;
      }
    });
  };
};
