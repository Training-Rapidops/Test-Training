const assert = require('assert');
const {Given, When, Then} = require('cucumber');
const makeGreetWelcomeToApp = require('./greet-welcome-to-app');
const greetWelcomeToApp = makeGreetWelcomeToApp();


Given('AppName is Sample', () => {
  this.appName = 'Sample';
});
When('I go to system', async () => {
  this.result = greetWelcomeToApp({appName: this.appName});
});

Then('It greets me welcome', () => {
  assert.equal(this.result, `Welcome to ${this.appName} service`);
});
