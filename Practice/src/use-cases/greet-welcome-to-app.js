module.exports = function makeGreetWelcomeToApp() {
  return function greetWelcomeToApp({appName}) {
    return `Welcome to ${appName} service`;
  };
};
