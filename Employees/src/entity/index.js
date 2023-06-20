const Joi = require("joi");
const { ValidationError } = require("../exceptions");

const makeEmployeeTemplet = require("./employee-templet");
const employeeTemplet = makeEmployeeTemplet({ Joi, ValidationError });

const makeTokenTemplete = require("./token-templete.js");
const tokenTemplete = makeTokenTemplete({ Joi, ValidationError });

const makePermissionTemplet = require("./permission-templet.js");
const permissionTemplet = makePermissionTemplet({ Joi, ValidationError });

const makeUserRoleAssociationTemplet = require("./user-role-association-templet.js");
const userRoleAssociationTemplet = makeUserRoleAssociationTemplet({
  Joi,
  ValidationError,
});

module.exports = Object.freeze({
  employeeTemplet,
  tokenTemplete,
  permissionTemplet,
  userRoleAssociationTemplet,
});
