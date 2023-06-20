const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeGetEmployeeUseCase = require("./get-employee");

After(() => {
  this.id = undefined;
  this.isEmployeeExists = undefined;
  this.isCompanyExists = undefined;

  sandbox.resetHistory();
});
Given(
  "employee details id:{string}, isEmployeeExists:{string} and isCompanyExists:{string} to get employee",
  (id, isEmployeeExists, isCompanyExists) => {
    this.id = id || undefined;
    this.isEmployeeExists = isEmployeeExists || undefined;
    this.isCompanyExists = isCompanyExists || undefined;
  }
);

const employeeDB = {
  getEmployeeDB: () => {},
};
const getEmployeeDBStub = sandbox.stub(employeeDB, "getEmployeeDB");
getEmployeeDBStub.callsFake((args) => {
  expect(args).deep.equal({ id: this.id });

  if (this.isEmployeeExists === "true") {
    return [
      {
        id: "4086f089-af2b-4616-80c1-ae60dd8ba8f6",
        employee_name: "Deep patel2",
        company_id: "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a",
        employee_address: "danilimda,Ahmedabad",
        employee_role: "Sr. Debveloper",
      },
    ];
  } else {
    return { rows: [] };
  }
});

const functionToMock = {
  getCompanyDetailsCall: () => {},
};
const getCompanyDetailsCallStub = sandbox.stub(
  functionToMock,
  "getCompanyDetailsCall"
);
getCompanyDetailsCallStub.callsFake((args) => {
  expect(args).deep.equal({ id: "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a" });
  if (this.isCompanyExists === "true") {
    return {
      id: "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a",
      company_name: "aaaa",
      company_address: "kjxhshx",
      contect_no: "9876543210",
      contect_email: "email2@mail.com",
    };
  } else {
    throw {
      status: "error",
      name: "NoDataFoundError",
      message:
        "Company with id e03d7be7-eff9-4b5b-bc79-e7f2288dff5f doesn't exists",
      date: "2023-06-01T13:21:33.777Z",
    };
  }
});

const getEmployee = makeGetEmployeeUseCase({
  Joi,
  employeeDB: employeeDB,
  getCompanyDetailsCall: functionToMock.getCompanyDetailsCall,
  ValidationError,
  DBError,
  NoDataFoundError,
});

When("try to get employee", async () => {
  try {
    this.result = await getEmployee({ id: this.id });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});

Then(
  "it will throw an error with message:{string} while getting employee",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result with employeeDetails:{string} while getting employee",
  (employeeDetails) => {
    expect(this.result).deep.equal(JSON.parse(employeeDetails));
  }
);

Then(
  "getEmployeeDB function will be called :{int} while getting employee",
  (getEmployeeDBFunctionCallCount) => {
    sinon.assert.callCount(getEmployeeDBStub, getEmployeeDBFunctionCallCount);
  }
);
Then(
  "getCompanyDetailsCall function will be called :{int} while getting employee",
  (getCompanyDetailsCallFunctionCallCount) => {
    sinon.assert.callCount(
      getCompanyDetailsCallStub,
      getCompanyDetailsCallFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while adding employee", (FunctionCallCount) => {
//   sinon.assert(Stub, FunctionCallCount);
// });
