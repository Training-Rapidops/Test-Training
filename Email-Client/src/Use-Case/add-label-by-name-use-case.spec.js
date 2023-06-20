const { Given, When, Then, After } = require("cucumber");
const makeAddLabelByName = require("./add-label-by-name-use-case");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();

Given(
  "User Id:{string} ,isvalidId:{string} and labelname:{string} ,labelExists:{string} are given to add label",
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
  getLabelByIdDB: () => {},
  addLabelByNameDB: () => {},
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
const getLabelByIdDBStub = sandbox.stub(labelDB, "getLabelByIdDB");
getLabelByIdDBStub.callsFake((args) => {
  if (this.labelExists === false) {
    expect(args.id).deep.equal(this.id);
    return [[{ lab: lab }]];
  } else {
    expect(args.id).deep.equal(this.id);
    return [[{ labelName: "myLabel2" }]];
  }
});
const addLabelByNameDBStub = sandbox.stub(labelDB, "addLabelByNameDB");
addLabelByNameDBStub.callsFake((args) => {
  expect(args).deep.equals({ id: this.id, label: this.label });
  return [{ affectedRows: 1 }];
});
When("Try to add label name", async () => {
  try {
    const addLabelByName = makeAddLabelByName({ Joi, userDB, labelDB });
    this.result = await addLabelByName({ id: this.id, label: this.label });
  } catch (err) {
    this.error = err.message;
  }
});
Then(
  "it will throw error with message:{string} while adding label name",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);
Then("it will count of added label:{int}", (addedLabel) => {
  expect(this.result).deep.equal(addedLabel);
});
