const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeGetAllEmployeeByCompanyUseCase = require("./get-all-employees-by-company-name");

After(() => {
  this.companyId = undefined;
  this.IsEmployeeExists = undefined;
  this.limit = undefined;
  this.offset = undefined;
  this.limitExided = undefined;

  sandbox.resetHistory();
});
Given(
  "employee details limit:{string},offset:{string},companyId:{string},limitExided:{string} and IsEmployeeExists:{string} to get all employees by company",
  (limit, offset, companyId, limitExided, IsEmployeeExists) => {
    this.companyId = companyId || undefined;
    this.IsEmployeeExists = IsEmployeeExists || undefined;
    this.limit = limit || undefined;
    this.offset = offset || undefined;
    this.limitExided = limitExided || undefined;
  }
);

const employeeDB = {
  getAllEmployeesByCompanyNameDB: () => {},
};
const getAllEmployeesByCompanyNameDBStub = sandbox.stub(
  employeeDB,
  "getAllEmployeesByCompanyNameDB"
);
getAllEmployeesByCompanyNameDBStub.callsFake((args) => {
  expect(args).deep.equal({
    limit: parseInt(this.limit),
    offset: parseInt(this.offset),
    companyId: this.companyId,
  });

  if (this.IsEmployeeExists === "true") {
    return [
      {
        id: "4086f089-af2b-4616-80c1-ae60dd8ba8f6",
        employee_name: "Deep patel2",
        company_id: "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a",
        employee_address: "danilimda,Ahmedabad",
        employee_role: "Sr. Debveloper",
      },
      {
        id: "4086f089-af2b-4616-80c1-ae60dd8ba8f6",
        employee_name: "Deep patel2",
        company_id: "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a",
        employee_address: "danilimda,Ahmedabad",
        employee_role: "Sr. Debveloper",
      },
    ];
  } else if (this.limitExided === true) {
    return [];
  } else {
    return [];
  }
});

const getAllEmployeesByCompany = makeGetAllEmployeeByCompanyUseCase({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

When("try to get all empployees by company", async () => {
  try {
    this.result = await getAllEmployeesByCompany({
      limit: this.limit,
      offset: this.offset,
      companyId: this.companyId,
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
  "it will throw an error with message:{string} while getting employees by company",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result with employeeDetails:{string} while getting employees by company",
  (employeeDetails) => {
    expect(this.result).deep.equal(JSON.parse(employeeDetails));
  }
);

Then(
  "getAllEmployeesByCompanyNameDB function will be called :{int} while getting employees by company",
  (getAllEmployeesByCompanyNameDBFunctionCallCount) => {
    sinon.assert.callCount(
      getAllEmployeesByCompanyNameDBStub,
      getAllEmployeesByCompanyNameDBFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while adding employee", (FunctionCallCount) => {
//   sinon.assert(Stub, FunctionCallCount);
// });
