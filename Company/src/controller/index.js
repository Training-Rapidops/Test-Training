const Joi = require("joi");

const { ValidationError } = require("../exceptions");

const {
  addCompany,
  getCompany,
  getCompanyByName,
  getAllCompany,
  updateCompany,
  deleteCompany,
} = require("../use-case");

const makeAddCompanyAction = require("./add-company");
const addCompanyAction = makeAddCompanyAction({
  Joi,
  addCompany,
  ValidationError,
});
const makeGetCompanyAction = require("./get-company");
const getCompanyAction = makeGetCompanyAction({
  Joi,
  getCompany,
  ValidationError,
});
const makeGetCompanyByNameAction = require("./get-company-by-name");
const getCompanyByNameAction = makeGetCompanyByNameAction({
  Joi,
  getCompanyByName,
  ValidationError,
});
const makeGetAllCompanyAction = require("./get-all-company");
const getAllCompanyAction = makeGetAllCompanyAction({
  Joi,
  getAllCompany,
  ValidationError,
});
const makeUpdateCompanyAction = require("./update-company");
const updateCompanyAction = makeUpdateCompanyAction({
  Joi,
  updateCompany,
  ValidationError,
});
const makeDeleteCompanyAction = require("./delete-company");
const deleteCompanyAction = makeDeleteCompanyAction({
  Joi,
  deleteCompany,
  ValidationError,
});

module.exports = Object.freeze({
  addCompanyAction,
  getCompanyAction,
  getCompanyByNameAction,
  getAllCompanyAction,
  updateCompanyAction,
  deleteCompanyAction,
});
