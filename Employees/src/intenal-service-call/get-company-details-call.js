module.exports = function makeGetCompanyDetailsCall({ fetch, config }) {
  return async function getCompanyCall({ id }) {
    baseURL = config.serviceEndpoints.company;
    url = "getcompany/" + id;

    const data = await fetch(baseURL + url, { method: "GET" });

    const result = await data.json();

    if (result.status === "error") {
      result.httpStatusCode = data.status;
      throw result;
    } else {
      return result.body;
    }
  };
};
