const formatResponse = require('./format-response').formatResponse;
const formatError = require('./format-response').formatError;

// Import useCases
const useCases = require('../use-cases');

// Import Actions
const makeGreetAction = require('./greet-welcome');

// Make Actions
const greetAction = makeGreetAction({
  greetWelcomeToApp: useCases.greetWelcomeToApp,
  formatResponse,
  formatError,
});

const makeCreateUserAction = require('./create-user');
const createUserAction = makeCreateUserAction({
  createUser: useCases.createUser,
  formatError,
  formatResponse,
});

// Create Controller Object
const controller = Object.freeze({
  greetAction,
  createUserAction,
});

// Export Controller
module.exports=controller;
