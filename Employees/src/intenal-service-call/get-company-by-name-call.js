module.exports = function makeGetCompanyByNameCall({ fetch, config }) {
  return async function getCompanyByNameCall({ name }) {
    console.log(name, "????????");
    baseURL = config.serviceEndpoints.company;
    url = "getcompanybyname/" + name;

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
