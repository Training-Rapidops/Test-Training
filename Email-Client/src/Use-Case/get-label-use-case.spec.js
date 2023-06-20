const { Given, When, Then, After } = require("cucumber");
const makeGetLabel = require("./get-label-use-case");
const Joi = require("joi");
const sinon = require("sinon");

const expect = require("chai").expect;
const sandbox = sinon.createSandbox();

Given("User Id:{string} to get labels", (userId) => {
  this.userId = userId || undefined;
});

const labelDB = {
  GetLabelsDB: () => {},
};
GetLabelsDBStub = sandbox.stub(labelDB, "GetLabelsDB");
GetLabelsDBStub.callsFake((args) => {
  expect(args.userId).deep.equal(this.userId);
  return [[{ labelName: "saved" }, { labelName: "inbox" }]];
});

When("Try to get lebles", async () => {
  try {
    const getLabel = makeGetLabel({ Joi, labelDB });
    this.result = await getLabel({ userId: this.userId });
  } catch (err) {
    this.error = err.message;
  }
});
Then(
  'it will throw error message:"{string}" while getting labels',
  (message) => {
    expect(this.error).deep.equal(message);
  }
);
Then('it will give labels Array:"{string}" after getting lables', (labels) => {
  expect(this.result).deep.equal(JSON.parse(labels));
});
