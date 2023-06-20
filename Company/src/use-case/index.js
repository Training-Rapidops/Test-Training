const Joi = require("joi");
const config = require("../config");
const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "app",
  brokers: config.kafka.brokerList,
});
const producer = kafka.producer();

const { companyDB } = require("../data-access");
const { companyTemplet } = require("../entity");
const {
  addOwnerCall,
  deleteEmployeesByCompanynameCall,
} = require("../internal-service-call");
const { ValidationError, NoDataFoundError, DBError } = require("../exceptions");

const makeAddCompanyUseCase = require("./add-company");
const addCompany = makeAddCompanyUseCase({
  Joi,
  companyTemplet,
  companyDB,
  addOwnerCall,
  ValidationError,
  DBError,
});
const makeGetCompanyUseCase = require("./get-company");
const getCompany = makeGetCompanyUseCase({
  Joi,
  companyDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});
const makeGetCompanyByNameUseCase = require("./get-company-by-name");
const getCompanyByName = makeGetCompanyByNameUseCase({
  Joi,
  companyDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});
const makeGetAllCompanyUseCase = require("./get-all-company");
const getAllCompany = makeGetAllCompanyUseCase({
  Joi,
  companyDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});
const makeUpdateCompanyUseCase = require("./update-company");
const updateCompany = makeUpdateCompanyUseCase({
  Joi,
  companyDB,
  companyTemplet,
  ValidationError,
  DBError,
  NoDataFoundError,
});
const makeDeleteCompanyUseCase = require("./delete-company");
const deleteCompany = makeDeleteCompanyUseCase({
  Joi,
  companyDB,
  deleteEmployeesByCompanynameCall,
  producer,
  ValidationError,
  NoDataFoundError,
  DBError,
});

module.exports = Object.freeze({
  addCompany,
  getCompany,
  getCompanyByName,
  getAllCompany,
  updateCompany,
  deleteCompany,
});
