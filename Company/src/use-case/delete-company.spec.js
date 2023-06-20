const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const makeDeleteCompanyUseCase = require("./delete-company");
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");

After(() => {
  this.id = undefined;
  this.isCorrectId = undefined;

  sandbox.resetHistory();
});

Given("company id:{string} and isCorrectId:{string}", (id, isCorrectId) => {
  this.id = id || undefined;
  this.isCorrectId = isCorrectId;
});

const companyDB = {
  deleteCompanyDB: () => {},
};
const producer = {
  connect: () => {},
  send: () => {},
  disconnect: () => {},
};

const deleteCompanyDBStub = sandbox.stub(companyDB, "deleteCompanyDB");
deleteCompanyDBStub.callsFake((args) => {
  expect(args).deep.equal({ id: this.id });

  if (this.isCorrectId === "true") {
    return { rowCount: 1 };
  } else {
    return { rowCount: 0 };
  }
});

const producerConnectStub = sandbox.stub(producer, "connect");
producerConnectStub.callsFake(() => {});
const producerDisconnectStub = sandbox.stub(producer, "disconnect");
producerDisconnectStub.callsFake(() => {});
const producerSendStub = sandbox.stub(producer, "send");
producerSendStub.callsFake(() => {});

const deleteCompany = makeDeleteCompanyUseCase({
  Joi,
  companyDB: companyDB,
  producer: producer,
  ValidationError,
  DBError,
  NoDataFoundError,
});

When("try to delete company", async () => {
  try {
    this.result = await deleteCompany({ id: this.id });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});

Then(
  "it will throw an error with message:{string} while deleting company",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give affected rows count:{string} while deleting company",
  (affectedRows) => {
    expect(this.result).deep.equal(JSON.parse(affectedRows));
  }
);

Then(
  "deleteCompanyDB function will be called :{int} while adding company",
  (deleteCompanyDBFunctionCallCount) => {
    sinon.assert.callCount(
      deleteCompanyDBStub,
      deleteCompanyDBFunctionCallCount
    );
  }
);
// Then(" function will be called : while adding company", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
