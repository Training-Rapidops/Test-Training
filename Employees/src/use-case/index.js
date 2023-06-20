const Joi = require("joi");
const config = require("../config");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const geoip = require("geoip-lite");
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  projectId: config.gcpStorage.projectId,
  keyFilename: config.gcpStorage.keyFilename,
});

const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "app",
  brokers: config.kafka.brokerList,
});
const producer = kafka.producer();

const { api_enums } = require("../utilities/constant");
const {
  employeeDB,
  tokenDB,
  permissionDB,
  userRoleAssociationDB,
} = require("../data-access");
const {
  employeeTemplet,
  tokenTemplete,
  permissionTemplet,
  userRoleAssociationTemplet,
} = require("../entity");
const {
  getCompanyByNameCall,
  getCompanyDetailsCall,
} = require("../intenal-service-call");
const {
  ValidationError,
  NoDataFoundError,
  DBError,
  AuthenticationError,
  AuthorizationError,
} = require("../exceptions");

const makeUploadPrfilePhoto = require("./upload-profile-photo");
const uploadPrfilePhoto = makeUploadPrfilePhoto({
  Joi,
  storage,
  config,
  path,
  ValidationError,
});

const makeUpdateEmployee = require("./update-employee");
const updateEmployee = makeUpdateEmployee({
  Joi,
  employeeTemplet,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});
const makeAddEmployee = require("./add-employee");
const addEmployee = makeAddEmployee({
  Joi,
  producer,
  bcrypt,
  employeeTemplet,
  employeeDB,
  getCompanyByNameCall,
  updateEmployee,
  ValidationError,
  DBError,
});
const makeGetEmployee = require("./get-employee");
const getEmployee = makeGetEmployee({
  Joi,
  employeeDB,
  getCompanyDetailsCall,
  ValidationError,
  DBError,
  NoDataFoundError,
});

const makeVarifyAuthToken = require("./varify-auth-token.js");
const varifyAuthToken = makeVarifyAuthToken({
  Joi,
  jwt,
  config,
  tokenDB,
  ValidationError,
  DBError,
  AuthorizationError,
});

const makeUpdateJwtExpireTime = require("./update-jwt-expire-time.js");
const updateJwtExpireTime = makeUpdateJwtExpireTime({
  Joi,
  tokenDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

const makeGetAllEmployees = require("./get-all-employees");
const getAllEmployees = makeGetAllEmployees({
  Joi,
  employeeDB,
  varifyAuthToken,
  updateJwtExpireTime,
  getCompanyDetailsCall,
  ValidationError,
  DBError,
  NoDataFoundError,
});
const makeGetAllEmployeeByCompany = require("./get-all-employees-by-company-name");
const getAllEmployeeByCompany = makeGetAllEmployeeByCompany({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

const makeDeleteEmployee = require("./delete-employee");
const deleteEmployee = makeDeleteEmployee({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});
const makeDeleteEmployeesByCompany = require("./delete-employee-by-company");
const deleteEmployeesByCompany = makeDeleteEmployeesByCompany({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

const makeSendMailToEmployee = require("./send-mail-to-employee");
const sendMailToEmployee = makeSendMailToEmployee({
  Joi,
  nodemailer,
  config,
  ValidationError,
});
const makeSendMailToCompany = require("./send-mail-to-company");
const sendMailToCompany = makeSendMailToCompany({
  Joi,
  nodemailer,
  ValidationError,
});

const makeVarifyEmployee = require("./varify-employee.js");
const varifyEmployee = makeVarifyEmployee({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

const makeGetLocationFromIp = require("./get-location-from-ip.js");
const getLocationFromIp = makeGetLocationFromIp({
  Joi,
  geoip,
  ValidationError,
});

const makeAddToken = require("./add-token");
const addToken = makeAddToken({
  Joi,
  jwt,
  config,
  getLocationFromIp,
  tokenTemplete,
  tokenDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

const makeLoginEmployee = require("./login-employee.js");
const loginEmployee = makeLoginEmployee({
  Joi,
  bcrypt,
  employeeDB,
  addToken,
  ValidationError,
  DBError,
  NoDataFoundError,
  AuthenticationError,
  AuthorizationError,
});

const makeGetAllSessions = require("./get-all-sessions.js");
const getAllSessions = makeGetAllSessions({
  Joi,
  tokenDB,
  varifyAuthToken,
  ValidationError,
  DBError,
  NoDataFoundError,
});

const makeDeleteSession = require("./delete-session.js");
const deleteSession = makeDeleteSession({
  Joi,
  getEmployee,
  tokenDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

const makeUpdateMultipleEmployees = require("./update-multiple-employees");
const updateMultipleEmployees = makeUpdateMultipleEmployees({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

const makeGetProfilePhoto = require("./get-profile-photo");
const getProfilePhoto = makeGetProfilePhoto({
  Joi,
  employeeDB,
  ValidationError,
  NoDataFoundError,
});

const makeDownloadProfilePhoto = require("./download-profile-photo");
const downloadProfilePhoto = makeDownloadProfilePhoto({
  Joi,
  getProfilePhoto,
  path,
  fs,
  storage,
  ValidationError,
  NoDataFoundError,
});

const makeAddUserRoleAssociation = require("./add-user-role-association");
const addUserRoleAssociation = makeAddUserRoleAssociation({
  Joi,
  userRoleAssociationTemplet,
  userRoleAssociationDB,
  ValidationError,
});

const makeAddPermission = require("./add-permission");
const addPermission = makeAddPermission({
  Joi,
  api_enums,
  getEmployee,
  addUserRoleAssociation,
  permissionTemplet,
  permissionDB,
  ValidationError,
  NoDataFoundError,
});

module.exports = Object.freeze({
  addEmployee,
  getEmployee,
  getAllEmployees,
  getAllEmployeeByCompany,
  updateEmployee,
  deleteEmployee,
  deleteEmployeesByCompany,
  sendMailToEmployee,
  sendMailToCompany,
  varifyEmployee,
  loginEmployee,
  addToken,
  getAllSessions,
  deleteSession,
  updateMultipleEmployees,
  downloadProfilePhoto,
  addPermission,
});
