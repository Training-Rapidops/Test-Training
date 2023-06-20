const { Given, When, Then, After } = require("cucumber");
const makeDeleteLabel = require("./delete-label-use-case");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();

Given(
  "User Id:{string} ,isvalidId:{string} ,labelname:{string} ,labelExists:{string}",
  (id, isValidId, label, labelExists) => {
    this.id = id || undefined;
    this.isValidId = isValidId || undefined;
    this.label = label || undefined;
    this.labelExists = labelExists || undefined;
  }
);
const userDB = {
  getUserByIdDB: () => {},
};
const labelDB = {
  deleteLabelDB: () => {},
};
const getUserByIdDBStub = sandbox.stub(userDB, "getUserByIdDB");
getUserByIdDBStub.callsFake((args) => {
  if (this.isValidId === "true") {
    expect(args.id).deep.equal(this.id);
    return [[1, 2, 3]];
  } else {
    expect(args.id).deep.equal(this.id);
    return [[]];
  }
});
const deleteLabelDBStub = sandbox.stub(labelDB, "deleteLabelDB");
deleteLabelDBStub.callsFake((args) => {
  if (this.labelExists === "true") {
    expect(args).deep.equal({ id: this.id, label: this.label });
    return [{ affectedRows: 1 }];
  } else {
    expect(args).deep.equal({ id: this.id, label: this.label });
    return [{ affectedRows: 0 }];
  }
});
When("Try to delete label", async () => {
  try {
    const deleteLabel = makeDeleteLabel({ Joi, userDB, labelDB });
    this.result = await deleteLabel({ id: this.id, label: this.label });
  } catch (err) {
    this.error = err.message;
  }
});
Then(
  'it will Throw error with message:"{string}" while deleting label',
  (message) => {
    expect(this.error).deep.equal(message);
  }
);
Then("it will give deleted label count:{int}", (labelDeleted) => {
  expect(this.result).deep.equal(labelDeleted);
});
