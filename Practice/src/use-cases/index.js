const ValidationError = require('../exceptions/validation.error');
const Joi = require('@hapi/joi');

// import databases
const {demoDb} = require('../data-access');

// Import all use cases
const makeGreetWelcomeToApp = require('./greet-welcome-to-app');

// Make use cases
const greetWelcomeToApp = makeGreetWelcomeToApp();


// usecase call to create demo entry in database
const makeDemoUsecase = require('./demo-usecase');
const demoUsecase = makeDemoUsecase({
  Joi,
  demoDb,
  ValidationError,
});

// Export use cases
module.exports = Object.freeze({
  greetWelcomeToApp,
  demoUsecase,
});
