const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeDeleteEmployeeByCompanyUseCase = require("./delete-employee-by-company");

After(() => {
  this.companyId = undefined;
  this.isEmployeeExist = undefined;

  sandbox.resetHistory();
});
Given(
  "company details companyId:{string} isEmployeeExist:{string} to delete employee by company",
  (companyId, isEmployeeExist) => {
    this.companyId = companyId || undefined;
    this.isEmployeeExist = isEmployeeExist || undefined;
  }
);

const employeeDB = {
  deleteEmployeesByCompanyDB: () => {},
};

const deleteEmployeesByCompanyDBStub = sandbox.stub(
  employeeDB,
  "deleteEmployeesByCompanyDB"
);
deleteEmployeesByCompanyDBStub.callsFake((args) => {
  expect(args).deep.equal({
    companyId: this.companyId,
  });
  if (this.isEmployeeExist === "true") {
    return { rowCount: 2 };
  } else {
    return { rowCount: 0 };
  }
});

const deleteEmployeeByCompany = makeDeleteEmployeeByCompanyUseCase({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

When("try to delete employee by company", async () => {
  try {
    this.result = await deleteEmployeeByCompany({ companyId: this.companyId });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});

Then(
  "it will throw an error with message:{string} while deleting employee by company",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give affected Rows:{string} while deleting employee by company",
  (affectedRows) => {
    expect(this.result).deep.equal(JSON.parse(affectedRows));
  }
);

Then(
  "deleteEmployeesByCompanyDB function will be called :{int} while deleting employee by company",
  (deleteEmployeesByCompanyDBFunctionCallCount) => {
    sinon.assert.callCount(
      deleteEmployeesByCompanyDBStub,
      deleteEmployeesByCompanyDBFunctionCallCount
    );
  }
);

// // Then(" function will be called :<FunctionCallCount> while adding employee", (FunctionCallCount) => {
// //   sinon.assert(Stub, FunctionCallCount);
// // });
