function makeGetModuleRecordAccessPermissionsByUserId({axios, config}) {
  return async function getModuleRecordAccessPermissionsByUserId(
      {
        linkname,
        userId,
      }) {
    const headers = {
      'x-linkname': linkname,
      'x-user-id': userId,
    };

    return axios({
      method: 'get',
      baseURL: `${config.serviceEndpoints.core}`,
      url: `/v1/users/${userId}/get-module-record-access-permissions`,
      params: {},
      headers,
    })
        .then(function(response) {
          if (response.status===200) {
            return response.data.Data;
          } else {
            return false;
          }
        });
  };
}

module.exports = makeGetModuleRecordAccessPermissionsByUserId;
