module.exports = function makeGetAllFieldsByType({axios, config}) {
  return async function getAllFieldsByType({
    fieldsToQuery,
    type,
    linkname,
    userId,
  }) {
    const headers = {
      'x-user-id': userId,
      'x-linkname': linkname,
    };
    const fieldsToReturn = await axios({
      method: 'get',
      baseURL: `${config.serviceEndpoints.core}`,
      url: '/v1/fields/filterByType?',
      params: {
        type: type.join(','),
        fieldsToQuery: fieldsToQuery.join(','),
      },
      headers,
    });
    return fieldsToReturn.data ? fieldsToReturn.data.Data : fieldsToReturn.data;
  };
};
