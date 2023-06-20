const fetch = require("node-fetch");
const FormData = require("form-data");
var form = new FormData();
const config = require("../config");

// const config = {
//   serviceEndpoint: {
//     employee: "http://employee:5000/employee/",
//   },
// };

const makeAddOwnerCall = require("./add-owner-call");
const addOwnerCall = makeAddOwnerCall({ fetch, form, config });

const makeDeleteEmployeesByCompanyNameCall = require("./delete-employee-by-company-name-call");
const deleteEmployeesByCompanynameCall = makeDeleteEmployeesByCompanyNameCall({
  fetch,
  config,
});

module.exports = Object.freeze({
  addOwnerCall,
  deleteEmployeesByCompanynameCall,
});
