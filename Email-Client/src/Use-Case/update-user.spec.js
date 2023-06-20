const { Given, When, Then, After } = require("cucumber");
const updateUserDetails = require("./update-user");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();

const { checkUserDB, updateUserDB } = require("../Data-Access");

After(() => {
  this.email = undefined;
  this.firstName = undefined;
  this.lastName = undefined;
  this.result = undefined;
  this.error = undefined;
});
Given(
  "User email:{string} and upadte object containing firstName:{string} and lastName:{string} to update User",
  (email, firstName, lastName) => {
    this.email = email || undefined;
    this.firstName = firstName || undefined;
    this.lastName = lastName || undefined;
    sandbox.resetHistory();
  }
);
const userDB = {
  getUserDB: () => {},
  updateUserDB: () => {},
};
const getUserDBStub = sandbox.stub(userDB, "getUserDB");
getUserDBStub.callsFake((args) => {
  if (args.email === "user34@mail.com") return [[]];
  expect(args.email).deep.equal("user@mail.com");
  return [[1, 2, 3]];
});
const updateUserDBStub = sandbox.stub(userDB, "updateUserDB");
updateUserDBStub.callsFake((args) => {
  expect(args).deep.equal({
    updateObj: {
      firstName: this.firstName,
      lastName: this.lastName,
    },
    email: this.email,
  });
  return 1;
});
const updateUser = updateUserDetails({
  Joi,
  userDB,
});
When("try to update User", async () => {
  try {
    this.result = await updateUser({
      email: this.email,
      updateObj: {
        firstName: this.firstName,
        lastName: this.lastName,
      },
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  'It will throw error message:"{string}" while updating user',
  (message) => {
    expect(this.error).deep.equal(message);
  }
);
Then("it will return {int} after updating", (updatedRowsCount) => {
  expect(this.result).deep.equal(updatedRowsCount);
});
Then(
  "getUserDB will call {int} times while Updating user",
  (getUserDBFunctionCallCount) => {
    sinon.assert.callCount(getUserDBStub, getUserDBFunctionCallCount);
  }
);
Then(
  "updateUserDB will call {int} times while Updating user",
  (updateUserDBFunctionCallCount) => {
    sinon.assert.callCount(updateUserDBStub, updateUserDBFunctionCallCount);
  }
);
