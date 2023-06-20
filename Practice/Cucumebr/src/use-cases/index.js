const Joi = require('@hapi/joi');

const exceptions = require('../exceptions');

const usersDb = {
  getUsersDetailByEmail: () => {
  },
  getUsersDetailByMobile: () => {
  },
  createUser: () => 1,
};
const encryptPassword = () => {
};

// Import all use cases
const makeGreetWelcomeToApp = require('./greet-welcome-to-app');

// Make use cases
const greetWelcomeToApp = makeGreetWelcomeToApp();

const makeCreateUser = require('./create-user');
const createUser = makeCreateUser({
  Joi,
  usersDb,
  encryptPassword,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.forbiddenError,
});

// Export use cases
module.exports = Object.freeze({
  greetWelcomeToApp,
  createUser,
});
