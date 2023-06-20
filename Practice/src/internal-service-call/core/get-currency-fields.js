function makeGetCurrencyFields({axios, config}) {
  return async function getCurrencyFields({
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
      url: `/v1/fields/get-currency-fields`,
      headers,
    });
    return fieldsToReturn.data ? fieldsToReturn.data.Data : fieldsToReturn.data;
  };
}

module.exports = makeGetCurrencyFields;
