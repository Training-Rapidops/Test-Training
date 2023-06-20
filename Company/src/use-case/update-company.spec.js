const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const makeupdateCompanyUseCase = require("./update-company");
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");

After(() => {
  this.id = undefined;
  this.name = undefined;
  this.address = undefined;
  this.contectNo = undefined;
  this.contectEmail = undefined;
  this.isCorrectId = undefined;

  sandbox.resetHistory();
});

Given(
  "company id:{string},name:{string}, address:{string}, contectNo:{string}, contectEmail:{string} and isCorrectId:{string} with id to update",
  (id, name, address, contectNo, contectEmail, isCorrectId) => {
    this.id = id || undefined;
    this.name = name || undefined;
    this.address = address || undefined;
    this.contectNo = contectNo || undefined;
    this.contectEmail = contectEmail || undefined;
    this.isCorrectId = isCorrectId || undefined;
  }
);

const companyDB = {
  updateCompanyDB: () => {},
};

const updateCompanyDBStub = sandbox.stub(companyDB, "updateCompanyDB");
updateCompanyDBStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
    name: this.name,
    address: this.address,
    contectNo: parseInt(this.contectNo),
    contectEmail: this.contectEmail,
  });
  if (this.isCorrectId === "true") {
    return { rowCount: 1 };
  } else {
    return { rowCount: 0 };
  }
});

const updateCompany = makeupdateCompanyUseCase({
  Joi,
  companyDB: companyDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

When("try to update company with id", async () => {
  try {
    this.result = await updateCompany({
      id: this.id,
      name: this.name,
      address: this.address,
      contectNo: this.contectNo,
      contectEmail: this.contectEmail,
    });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});
Then(
  "it will throw an error with message:{string} while updating company with id",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);
Then(
  "it will give affected rows count:{string} updating company with id",
  (affectedRows) => {
    expect(this.result).deep.equal(JSON.parse(affectedRows));
  }
);

Then(
  "updateCompanyDB function will be called :{int} while adding company",
  (updateCompanyDBFunctionCallCount) => {
    sinon.assert.callCount(
      updateCompanyDBStub,
      updateCompanyDBFunctionCallCount
    );
  }
);

// Then(" function will be called : while adding company", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
