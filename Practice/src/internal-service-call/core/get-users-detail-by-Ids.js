function makeGetUsersDetailByIds({axios, config}) {
  return async function getUsersDetailByIds({
    linkname,
    userId,
    userIds,
    fieldsToQuery,
  }) {
    // This use is for forward relation

    const headers = {
      'x-linkname': linkname,
      'x-user-id': userId,
    };

    return axios({
      method: 'get',
      baseURL: `${config.serviceEndpoints.core}`,
      url: `/v1/users/by-ids`,
      params: {
        ids: userIds.join(','),
        fieldsToQuery: fieldsToQuery.join(','),
      },
      headers,
    }).then(function(response) {
      if (response.status === 200) {
        return response.data.Data;
      } else {
        return false;
      }
    });
  };
}

module.exports = makeGetUsersDetailByIds;
