const { Given, When, Then, After } = require("cucumber");
const makeUpdateLabel = require("./update-label-use-case");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();

Given(
  "User id:{string} ,isValidId:{string} ,label:{string} ,labelFound:{string} ,newlabel:{string} ,labelExists:{string}",
  (id, isValidId, label, labelFound, newLabel, labelExists) => {
    this.id = id || undefined;
    this.isValidId = isValidId || undefined;
    this.label = label || undefined;
    this.labelFound = labelFound || undefined;
    this.newLabel = newLabel || undefined;
    this.labelExists = labelExists || undefined;
  }
);
const userDB = {
    getUserByIdDB: () => {},
  },
  labelDB = {
    getLabelByIdDB: () => {},
    updateLabelDB: () => {},
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
  if (this.labelExists === "false") {
    expect(args.id).deep.equal(this.id);
    return [[{ labelName: "sdg" }, { labelName: "hjcgs" }]];
  } else {
    expect(args.id).deep.equal(this.id);
    return [[{ labelName: "mylabel2" }, { labelName: "hjcgs" }]];
  }
});
const updateLabelDBStub = sandbox.stub(labelDB, "updateLabelDB");
updateLabelDBStub.callsFake((args) => {
  if (this.labelFound === "true") {
    expect(args).deep.equal({
      id: this.id,
      label: this.label,
      newLabel: this.newLabel,
    });
    return [{ affectedRows: 1 }];
  } else {
    expect(args).deep.equal({
      id: this.id,
      label: this.label,
      newLabel: this.newLabel,
    });
    return [{ affectedRows: 0 }];
  }
});
When("try to update user", async () => {
  try {
    const updateLabel = makeUpdateLabel({ Joi, userDB, labelDB });
    this.result = await updateLabel({
      id: this.id,
      label: this.label,
      newLabel: this.newLabel,
    });
  } catch (err) {
    this.error = err.message;
  }
});
Then(
  'it will throw error with messgae:"{string}" while updating user',
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give count of updated labels:{int} after updating label",
  (labelUpdated) => {
    expect(this.result).deep.equal(labelUpdated);
  }
);
