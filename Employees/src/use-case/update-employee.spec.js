const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeUpdateEmployeeUseCase = require("./update-employee");

After(() => {
  this.id = undefined;
  this.address = undefined;
  this.role = undefined;
  this.isEmployeeExist = undefined;

  sandbox.resetHistory();
});
Given(
  "employee details id:{string}, address:{string}, role:{string} and isEmployeeExist:{string} to update employee",
  (id, address, role, isEmployeeExist) => {
    this.id = id || undefined;
    this.address = address || undefined;
    this.role = role || undefined;
    this.isEmployeeExist = isEmployeeExist || undefined;
  }
);

const employeeDB = {
  updateEmployeeDB: () => {},
};

const updateEmployeeDBStub = sandbox.stub(employeeDB, "updateEmployeeDB");
updateEmployeeDBStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
    address: this.address,
    role: this.role,
  });

  if (this.isEmployeeExist === "true") {
    return { rowCount: 1 };
  } else {
    return { rowCount: 0 };
  }
});
const functionToMock = {
  employeeTemplet: () => {},
};

const employeeTempletStub = sandbox.stub(functionToMock, "employeeTemplet");
employeeTempletStub.callsFake((args) => {
  expect(args).deep.equal({
    address: this.address,
    role: this.role,
  });

  value = { address: this.address, role: this.role };
  return {
    getAddress: () => value.address,
    getRole: () => value.role,
  };
});

const updateEmployee = makeUpdateEmployeeUseCase({
  Joi,
  employeeTemplet: functionToMock.employeeTemplet,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

When("try to update employee", async () => {
  try {
    this.result = await updateEmployee({
      id: this.id,
      address: this.address,
      role: this.role,
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
  "it will throw an error with message:{string} while updating employee",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result affected rows :{string} while updating employee",
  (affectedRows) => {
    expect(this.result).deep.equal(JSON.parse(affectedRows));
  }
);

Then(
  "employeeTemplet function will be called :{int} while updating employee",
  (employeeTempletFunctionCallCount) => {
    sinon.assert.callCount(
      employeeTempletStub,
      employeeTempletFunctionCallCount
    );
  }
);

Then(
  "updateEmployeeDB function will be called :{int} while updating employee",
  (updateEmployeeDBFunctionCallCount) => {
    sinon.assert.callCount(
      updateEmployeeDBStub,
      updateEmployeeDBFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while adding employee", (FunctionCallCount) => {
//   sinon.assert(Stub, FunctionCallCount);
// });
