const formatResponse = require('./format-response').formatResponse;
const formatError = require('./format-response').formatError;
const ValidationError = require('../exceptions/validation.error');
const Joi = require('@hapi/joi');

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

const makeDemoControllerAction = require('./demo-controller');
const demoControllerAction = makeDemoControllerAction({
  Joi,
  ValidationError,
  demoUsecase: useCases.demoUsecase,
  formatResponse,
  formatError,
});

// Create Controller Object
const controller = Object.freeze({
  greetAction,
  demoControllerAction,
});

// Export Controller
module.exports=controller;
