const axios = require('axios');
const config = require('../../config');

const makeGetAllFieldsByModule = require('./get-all-fields-by-module');
const getAllFieldsByModule = makeGetAllFieldsByModule({axios, config});

const makeGetUsersDetailByIds = require('./get-users-detail-by-Ids');
const getUsersDetailByIds = makeGetUsersDetailByIds({axios, config});

const makeGetAllFieldsByType = require('./get-all-fields-by-type');
const getAllFieldsByType = makeGetAllFieldsByType({axios, config});

const makeGetModuleRecordAccessPermissionsByUserId = require('./get-module-record-access-permissions-by-user-id');
const getModuleRecordAccessPermissionsByUserId = makeGetModuleRecordAccessPermissionsByUserId({axios, config});

const makeGetUserFields = require('./get-user-fields');
const getUserFields = makeGetUserFields({axios, config});

const makeGetCurrencyFields = require('./get-currency-fields');
const getCurrencyFields = makeGetCurrencyFields({axios, config});

module.exports = Object.freeze({
  getAllFieldsByModule,
  getUsersDetailByIds,
  getAllFieldsByType,
  getModuleRecordAccessPermissionsByUserId,
  getUserFields,
  getCurrencyFields,
});
