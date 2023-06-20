const { Given, When, Then, After } = require("cucumber");
const deleteUserDetails = require("./delete-user");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();

// const { checkUserDB, deleteUserDB } = require("../Data-Access");
// const userDB = require("../Data-Access/user-table");

After(() => {
  this.email = undefined;
  this.error = undefined;
  this.result = undefined;
  sandbox.resetHistory();
});

Given("User email:{string} to delete User", (email) => {
  this.email = email || undefined;
});

userDB = {
  getUserDB: () => {},
  deleteUserDB: () => {},
};
const deleteUserDBStub = sandbox.stub(userDB, "deleteUserDB");
deleteUserDBStub.callsFake((args) => {
  expect(args.email).deep.equal(this.email);
  return [{ affectedRows: 1 }];
});
const getUserDBStub = sandbox.stub(userDB, "getUserDB");
getUserDBStub.callsFake((args) => {
  if (args.email === "user34@mail.com") {
    return [[]];
  }
  expect(args.email).deep.equal("user@mail.com");
  return [[1, 2, 3]];
});
const deleteUser = deleteUserDetails({ Joi, userDB });

When("try to delete User", async () => {
  try {
    this.result = await deleteUser({ email: this.email });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  'It will throw error message:"{string}" while deleting user',
  (message) => {
    expect(this.error).deep.equal(message);
  }
);
Then(
  "It will give deleted user count:{int} while deleting user",
  (deletedUserCount) => {
    expect(this.result).deep.equal(deletedUserCount);
  }
);
Then(
  "getUserDB Function will call {int} times while deleting User",
  (getUserDBFunctionCallCount) => {
    sinon.assert.callCount(getUserDBStub, getUserDBFunctionCallCount);
  }
);
Then(
  "deleteUserDB Function will call {int} times while deleting User",
  (deleteUserDBFunctionCallCount) => {
    sinon.assert.callCount(deleteUserDBStub, deleteUserDBFunctionCallCount);
  }
);
