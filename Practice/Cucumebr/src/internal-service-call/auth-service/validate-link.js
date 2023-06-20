module.exports = function makeValidateLink({axios, config}) {
  return async function validateLink({linkname}) {
    return axios({
      method: 'get',
      url: `${config.subscription.urlV1}/v1/accounts/detail/${linkname}`,
      headers: {
        'x-user-id': config.subscription.botUser,
      },
    }).then(function(response) {
      if (response.status === 200) {
        return response.data.Data;
      } else {
        return false;
      }
    });
  };
};
