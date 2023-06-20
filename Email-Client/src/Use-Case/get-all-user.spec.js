const { Given, When, Then, After } = require("cucumber");
const getAllUser = require("./get-all-user");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();

const { getAllUserDB } = require("../Data-Access");
After(() => {
  this.error = undefined;
  this.result = undefined;
  sandbox.resetHistory();
});
Given("get user data", () => {});
const userDB = {
  getAllUserDB: () => {},
};
const functionToMock = {
  getLabel: () => {},
};
const getAllUserDBStub = sandbox.stub(userDB, "getAllUserDB");
getAllUserDBStub.callsFake((args) => {
  const answer = [
    {
      id: 20,
      firstName: "Akash",
      lastName: "Solanki",
      userEmailId: "user@mail.com",
    },
  ];
  return answer;
});
const getLabelStub = sandbox.stub(functionToMock, "getLabel");
getLabelStub.callsFake((args) => {
  expect(args.userId).deep.equal(20);
  return ["saved"];
});
const allUserDetailsUsecase = getAllUser({
  userDB,
  getLabel: functionToMock.getLabel,
});
When("try to get all User", async () => {
  try {
    this.result = await allUserDetailsUsecase();
  } catch (err) {
    this.error = err.message;
  }
});
Then("it will give all user details {string}", (userDetails) => {
  expect(this.result).deep.equal(JSON.parse(userDetails));
});
Then(
  "getAllUserDB function will call {int} time while creating new User",
  (getAllUserDBFunctionCallCount) => {
    sinon.assert.callCount(getAllUserDBStub, getAllUserDBFunctionCallCount);
  }
);
