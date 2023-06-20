const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeDeleteSession = require("./delete-session");

const tokenDB = {
  deleteSessionDB: () => {},
};
const deleteSessionDBStub = sandbox.stub(tokenDB, "deleteSessionDB");
deleteSessionDBStub.callsFake((args) => {
  expect(args).deep.equal({
    tokenId: this.tokenId,
    employeeId: this.employeeId,
  });

  if (this.isTokenExists === "true") {
    return { rowCount: 2 };
  } else {
    return { rowCount: 0 };
  }
});

const functionToMock = {
  getEmployee: () => {},
};
const getEmployeeStub = sandbox.stub(functionToMock, "getEmployee");
getEmployeeStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.employeeId,
  });
  if (this.isEmployeeExists === "true") {
    return true;
  } else {
    throw { message: `Employee With id ${this.employeeId} doesn't Exists` };
  }
});

const deleteSession = makeDeleteSession({
  Joi,
  getEmployee: functionToMock.getEmployee,
  tokenDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

After(() => {
  this.tokenId = undefined;
  this.employeeId = undefined;
  this.isEmployeeExists = undefined;
  this.isTokenExists = undefined;
  sandbox.resetHistory();
});
Given(
  "token id:{string}, employee id:{string}, isTokenExists:{string} and isEmployeeExists:{string} to delete session",
  (tokenId, employeeId, isTokenExists, isEmployeeExists) => {
    this.tokenId = tokenId ? JSON.parse(tokenId) : undefined;
    this.employeeId = employeeId || undefined;
    this.isTokenExists = isTokenExists || undefined;
    this.isEmployeeExists = isEmployeeExists || undefined;
  }
);

When("try to delete session", async () => {
  try {
    this.result = await deleteSession({
      tokenId: this.tokenId,
      employeeId: this.employeeId,
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
  "it will throw an error with message:{string} while deleting sessions",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result affected rows:{string} while deleting sessions",
  (affectedRows) => {
    expect(this.result).deep.equal(JSON.parse(affectedRows));
  }
);

Then(
  "deleteSessionDB function will be called :{int} while deleting sessions",
  (deleteSessionDBFunctionCallCount) => {
    sinon.assert.callCount(
      deleteSessionDBStub,
      deleteSessionDBFunctionCallCount
    );
  }
);

Then(
  "getEmployee function will be called :{int} while deleting session",
  (getEmployeeFunctionCallCount) => {
    sinon.assert.callCount(getEmployeeStub, getEmployeeFunctionCallCount);
  }
);
