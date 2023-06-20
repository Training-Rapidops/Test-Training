const Joi = require("joi");
const makeCompanyTemplet = require("./company-templet");
const { ValidationError } = require("../exceptions");
const companyTemplet = makeCompanyTemplet({ Joi, ValidationError });

module.exports = Object.freeze({
  companyTemplet,
});
