const axios = require('axios');
const config = require('../../config');
const makeAuthorizeUser = require('./authorize-user');
const authorizeUser = makeAuthorizeUser({axios, config});

const makeValidateLink = require('./validate-link');
const validateLink = makeValidateLink({axios, config});

const makeAuthorizeApplication = require('./authorize-application');
const authorizeApplication = makeAuthorizeApplication({axios, config});

module.exports = {
  authorizeUser,
  validateLink,
  authorizeApplication,
};
