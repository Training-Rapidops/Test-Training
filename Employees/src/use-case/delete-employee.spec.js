const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeDeleteEmployeeUseCase = require("./delete-employee");

After(() => {
  this.id = undefined;
  this.isEmployeeExist = undefined;
  sandbox.resetHistory();
});
Given(
  "employee detail id:{string} and isEmployeeExist:{string} to delete employee",
  (id, isEmployeeExist) => {
    this.id = id || undefined;
    this.isEmployeeExist = isEmployeeExist || undefined;
  }
);

const employeeDB = {
  deleteEmployeeDB: () => {},
};

const deleteEmployeeDBStub = sandbox.stub(employeeDB, "deleteEmployeeDB");
deleteEmployeeDBStub.callsFake((args) => {
  expect(args).deep.equal({ id: this.id });
  if (this.isEmployeeExist === "true") {
    return { rowCount: 1 };
  } else {
    return { rowCount: 0 };
  }
});
const deleteEmployee = makeDeleteEmployeeUseCase({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

When("try to delete employee", async () => {
  try {
    this.result = await deleteEmployee({ id: this.id });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});

Then(
  "it will throw an error with message:{string} while deleting employee",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give affected Rows:{string} while deleting employee",
  (affectedRows) => {
    expect(this.result).deep.equal(JSON.parse(affectedRows));
  }
);

Then(
  "deleteEmployeeDB function will be called :{int} while deleting employee",
  (deleteEmployeeDBFunctionCallCount) => {
    sinon.assert.callCount(
      deleteEmployeeDBStub,
      deleteEmployeeDBFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while adding employee", (FunctionCallCount) => {
//   sinon.assert(Stub, FunctionCallCount);
// });
