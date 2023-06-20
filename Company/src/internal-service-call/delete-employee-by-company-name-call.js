module.exports = function makeDeleteEmployeesByCompanyNameCall({
  fetch,
  config,
}) {
  return async function deleteEmployeesByCompanynameCall({ id }) {
    baseURL = config.serviceEndpoints.employee;
    url = "deleteemployeesbycompany/" + id;

    const data = await fetch(baseURL + url, { method: "DELETE" });

    const result = await data.json();

    if (result.status === "error") {
      result.httpStatusCode = data.status;
      throw result;
    } else {
      return result.body;
    }
  };
};
