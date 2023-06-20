const { Given, When, Then, After } = require("cucumber");
const addUserDetails = require("./add-user");
const Joi = require("joi");
const sinon = require("sinon");
// const userDB = require("../Data-Access/user-table");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();

// const { checkUserDB, addUserDB } = require("../Data-Access/userDB");
After(() => {
  this.email = undefined;
  this.firstName = undefined;
  this.lastName = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});
Given(
  "User details firstName:{string},lastName:{string},email:{string}",
  (firstName, lastName, email) => {
    this.firstName = firstName || undefined;
    this.lastName = lastName || undefined;
    this.email = email || undefined;
    // this.message = this.message || undefined;
  }
);

const userDB = {
  getUserDB: () => {},
  addUserDB: () => {},
};
functionToMock = {
  addLabel: () => {},
};
const getUserDBStub = sandbox.stub(userDB, "getUserDB");
getUserDBStub.callsFake((args) => {
  if (args.email === "user@mail.com") {
    const ans = [[1, 2, 3]];
    return ans;
  } else {
    expect(args.email).deep.equal("user2@mail.com");
    return [[]];
  }
});

const addUserDBStub = sandbox.stub(userDB, "addUserDB");
addUserDBStub.callsFake((args) => {
  expect(args).deep.equal({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
  });
  this.id = 23;
  return [{ insertId: this.id }];
});

const addLabelStub = sandbox.stub(functionToMock, "addLabel");
addLabelStub.callsFake((args) => {
  expect(args.insertId).deep.equal(this.id);
  return;
});
// Joi, userDB, addLabel
const addUser = addUserDetails({
  Joi,
  userDB,
  addLabel: functionToMock.addLabel,
});
When("try to add User", async () => {
  try {
    this.result = await addUser({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    });
  } catch (err) {
    this.error = err.message;
  }
});
Then('it will add new User With "{string}"', (addedDetails) => {
  expect(this.result).deep.equal(JSON.parse(addedDetails));
});
Then(
  'it will throw error with message:"{string}" while getting user',
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "getUserDB function will call {int} times while creating user",
  (getUserDBFunctionCallCount) => {
    sinon.assert.callCount(getUserDBStub, getUserDBFunctionCallCount);
  }
);
Then(
  "addUserDB function will call {int} time while creating new User",
  (addUserDBFunctionCallCount) => {
    sinon.assert.callCount(addUserDBStub, addUserDBFunctionCallCount);
  }
);
Then(
  "addLabel function will call {int} times while creating new User",
  (addLabelFunctionCallCount) => {
    sinon.assert.callCount(addLabelStub, addLabelFunctionCallCount);
  }
);
