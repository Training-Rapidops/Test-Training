function makeGetUserFields({axios, config}) {
  return async function getUserFields({
    userId,
    linkname,
  }) {
    const headers = {
      'x-user-id': userId,
      'x-linkname': linkname,
    };
    const fieldsToReturn = await axios({
      method: 'get',
      baseURL: `${config.serviceEndpoints.core}`,
      url: `/v1/fields/get-user-fields`,
      headers,
    });
    return fieldsToReturn.data ? fieldsToReturn.data.Data : fieldsToReturn.data;
  };
}

module.exports = makeGetUserFields;
