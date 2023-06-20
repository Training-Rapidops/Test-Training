const fetch = require("node-fetch");
const config = require("../config");
// const config = {
//   serviceEndpoint: {
//     core: "http://company:6000/company/",
//   },
// };

const makeGetCompanyByNameCall = require("./get-company-by-name-call");
const getCompanyByNameCall = makeGetCompanyByNameCall({ fetch, config });
const makeGetCompanyDetailsCall = require("./get-company-details-call");
const getCompanyDetailsCall = makeGetCompanyDetailsCall({ fetch, config });

module.exports = Object.freeze({ getCompanyByNameCall, getCompanyDetailsCall });
