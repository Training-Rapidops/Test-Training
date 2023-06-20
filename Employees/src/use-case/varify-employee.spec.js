const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeVarifyEmployee = require("./varify-employee");

const employeeDB = { varifyEmployeeDB: () => {} };
const varifyEmployeeDBStub = sandbox.stub(employeeDB, "varifyEmployeeDB");
varifyEmployeeDBStub.callsFake((args) => {
  expect(args).deep.equal({ email: this.email });
  if (this.isEmployeeExists === "true") {
    return { rowCount: 1 };
  }
  return { rowCount: 0 };
});

const varifyEmployee = makeVarifyEmployee({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

After(() => {
  sandbox.resetHistory();
});
Given(
  "employee email:{string} and isEmployeeExists:{string} to varify employee",
  (email, isEmployeeExists) => {
    this.email = email || undefined;
    this.isEmployeeExists = isEmployeeExists || undefined;
  }
);

When("try to varify employee", async () => {
  try {
    this.result = await varifyEmployee({ email: this.email });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});

Then(
  "it will throw an error with message:{string} while varifing employee",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result with affected rows:{string} while varifing employee",
  (affectedRows) => {
    expect(this.result).deep.equal(JSON.parse(affectedRows));
  }
);

Then(
  "varifyEmployeeDB function will be called :{int} while varifing employee",
  (varifyEmployeeDBFunctionCallCount) => {
    sinon.assert.callCount(
      varifyEmployeeDBStub,
      varifyEmployeeDBFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
