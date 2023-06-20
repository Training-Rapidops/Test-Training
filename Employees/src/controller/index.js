const Joi = require("joi");
const fetch = require("node-fetch");
const { ValidationError } = require("../exceptions");

const {
  addEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  varifyEmployee,
  deleteEmployeesByCompany,
  getAllEmployeeByCompany,
  loginEmployee,
  addToken,
  getAllSessions,
  deleteSession,
  updateMultipleEmployees,
  downloadProfilePhoto,
  addPermission,
} = require("../use-case");

const makeAddEmployeeAction = require("./add-employee");
const addEmployeeAction = makeAddEmployeeAction({
  Joi,
  addEmployee,
  ValidationError,
});
const makeGetEmployeeAction = require("./get-employee");
const getEmployeeAction = makeGetEmployeeAction({
  Joi,
  getEmployee,
  ValidationError,
});
const makeGetAllEmployeeByCompanyAction = require("./get-all-employees-by-company");
const getAllEmployeeByCompanyAction = makeGetAllEmployeeByCompanyAction({
  Joi,
  getAllEmployeeByCompany,
  ValidationError,
});
const makeGetAllEmployeesAction = require("./get-all-employees");
const getAllEmployeesAction = makeGetAllEmployeesAction({
  Joi,
  getAllEmployees,
  ValidationError,
});
const makeUpdateEmployeeAction = require("./update-employee");
const updateEmployeeAction = makeUpdateEmployeeAction({
  Joi,
  updateEmployee,
  ValidationError,
});
const makeDeleteEmployeeAction = require("./delete-employee");
const deleteEmployeeAction = makeDeleteEmployeeAction({
  Joi,
  deleteEmployee,
  ValidationError,
});
const makeDeleteEmployeesByCompanyAction = require("./delete-all-employee-by-company");
const deleteEmployeesByCompanyAction = makeDeleteEmployeesByCompanyAction({
  Joi,
  deleteEmployeesByCompany,
  ValidationError,
});

const makeVarifyEmployeeAction = require("./varify-employee");
const varifyEmployeeAction = makeVarifyEmployeeAction({
  Joi,
  varifyEmployee,
  fetch,
  ValidationError,
});

const makeLoginEmployeeAction = require("./login-employee.js");
const loginEmployeeAction = makeLoginEmployeeAction({
  Joi,
  loginEmployee,
  addToken,
  ValidationError,
});

const makeGetAllSessionsAction = require("./get-all-sessions");
const getAllSessionsAction = makeGetAllSessionsAction({
  Joi,
  getAllSessions,
  ValidationError,
});

const makeDeleteSessionAction = require("./delete-session");
const deleteSessionAction = makeDeleteSessionAction({
  Joi,
  deleteSession,
  ValidationError,
});

const makeUpdateMultipleEmployeesAction = require("./update-multiple-employee");
const updateMultipleEmployeesAction = makeUpdateMultipleEmployeesAction({
  Joi,
  updateMultipleEmployees,
  ValidationError,
});

const makeDownloadProfilePhotoAction = require("./download-profile-photo");
const downloadProfilePhotoAction = makeDownloadProfilePhotoAction({
  Joi,
  downloadProfilePhoto,
  ValidationError,
});

const makeAddPermissionsAction = require("./add-permissions.js");
const addPermissionsAction = makeAddPermissionsAction({
  Joi,
  addPermission,
  ValidationError,
});

module.exports = Object.freeze({
  addEmployeeAction,
  loginEmployeeAction,
  getEmployeeAction,
  getAllEmployeesAction,
  getAllEmployeeByCompanyAction,
  getAllSessionsAction,
  varifyEmployeeAction,
  updateEmployeeAction,
  deleteEmployeeAction,
  deleteEmployeesByCompanyAction,
  deleteSessionAction,
  updateMultipleEmployeesAction,
  downloadProfilePhotoAction,
  addPermissionsAction,
});
