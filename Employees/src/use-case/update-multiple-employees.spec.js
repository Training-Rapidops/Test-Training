const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeUpdateMultipleEmployees = require("./update-multiple-employees");

const employeeDB = { updateMultipleEmployeesDB: () => {} };
const updateMultipleEmployeesDBStub = sandbox.stub(
  employeeDB,
  "updateMultipleEmployeesDB"
);
updateMultipleEmployeesDBStub.callsFake((args) => {
  expect(args).deep.equal({
    updateDataObj: args.updateDataObj,
    idArray: args.idArray,
  });

  if (this.isDataExists === "true") {
    return { rowCount: 2 };
  }
  return { rowCount: 0 };
});

const updateMultipleEmployees = makeUpdateMultipleEmployees({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

After(() => {
  this.updateData = undefined;
  this.isDataExists = undefined;
  sandbox.resetHistory();
});
Given(
  "data that needs to be updated:{string}, isDataExists:{string} to update multiple employee data",
  (updateData, isDataExists) => {
    this.updateData = updateData ? JSON.parse(updateData) : undefined;
    this.isDataExists = isDataExists || undefined;
  }
);

When("try to update multiple employee data", async () => {
  try {
    this.result = await updateMultipleEmployees({
      updateData: this.updateData,
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
  "it will throw an error with message:{string} while updating multiple employee data",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result with affectedRows:{string} while updating multiple employee data",
  (affectedRows) => {
    expect(this.result).deep.equal(JSON.parse(affectedRows));
  }
);

Then(
  "updateMultipleEmployeesDB function will be called :{int} while updating multiple employee data",
  (updateMultipleEmployeesDBFunctionCallCount) => {
    sinon.assert.callCount(
      updateMultipleEmployeesDBStub,
      updateMultipleEmployeesDBFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
