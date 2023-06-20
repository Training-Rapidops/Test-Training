function makeGetAllFieldsByModule({axios, config}) {
  return async function getAllFieldsByModule({
    fieldsToFilter,
    moduleId,
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
      url: `/v1/fields/filterByModuleId`,
      params: {
        moduleId,
        fieldsToFilter: fieldsToFilter.join(','),
      },
      headers,
    });
    return fieldsToReturn.data ? fieldsToReturn.data.Data : fieldsToReturn.data;
  };
}

module.exports = makeGetAllFieldsByModule;
