const { Given, When, Then, After } = require("cucumber");
const getUser = require("./get-user");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();

After(() => {
  this.email = undefined;
  this.error = undefined;
  this.result = undefined;
  sandbox.resetHistory();
});

Given("User email:{string} to get User", (email) => {
  this.email = email || undefined;
});
const userDB = {
  getUserDB: () => {},
};
const functionToMock = {
  getLabel: () => {},
};
const getUserDBStub = sandbox.stub(userDB, "getUserDB");
getUserDBStub.callsFake((args) => {
  if (args.email === "user34@mail.com") {
    return [[]];
  }
  expect(args.email).deep.equal(this.email);
  const answer = [
    [
      {
        id: 20,
        firstName: "Akash",
        lastName: "Solanki",
        userEmailId: this.email,
      },
    ],
  ];
  return answer;
});
// const checkUserDBStub = sandbox.stub(functionToMock2, "checkUserDB");
// checkUserDBStub.callsFake((args) => {
//   console.log(args);
//   if (args === "user34@mail.com") {
//     return false;
//   }
//   expect(args).deep.equal("user@mail.com");
//   return true;
// });
const getLabelStub = sandbox.stub(functionToMock, "getLabel");
getLabelStub.callsFake((args) => {
  const label = ["saved", "archived"];
  return label;
});

const userDetailUseCase = getUser({
  Joi,
  userDB,
  getLabel: functionToMock.getLabel,
});
When("try to get User", async () => {
  try {
    this.result = await userDetailUseCase({ email: this.email });
  } catch (err) {
    this.error = err.message;
  }
});
Then('It will throw error message:"{string}" while getting user', (message) => {
  expect(this.error).deep.equal(message);
});
Then(
  "It will get Specified {string} after getting user details",
  (userDetails) => {
    expect(this.result).deep.equal(JSON.parse(userDetails));
  }
);
// Then(
//   "checkUserDB will be called {int} times while getting user",
//   (checkUserDBFunctionCallCount) => {
//     sinon.assert.callCount(checkUserDBStub, checkUserDBFunctionCallCount);
//   }
// );
Then(
  "getUserDB will be called {int} times while getting user",
  (getUserDBFunctionCallCount) => {
    sinon.assert.callCount(getUserDBStub, getUserDBFunctionCallCount);
  }
);
Then(
  "getLabel will be called {int} times while getting user",
  (getLabelFunctionCallCount) => {
    sinon.assert.callCount(getLabelStub, getLabelFunctionCallCount);
  }
);
