const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const {
  ValidationError,
  DBError,
  NoDataFoundError,
  AuthenticationError,
  AuthorizationError,
} = require("../exceptions");
const makeLoginEmployee = require("./login-employee");

const bcrypt = {
  compare: () => {},
};
const compareStub = sandbox.stub(bcrypt, "compare");
compareStub.callsFake((args) => {
  expect(args).deep.equal(
    this.password,
    "$2b$10$uoHDv5hNZX6Vy6xBRK.Ch.fJJ.psDCR2cD.89wctVXqXsRGDggz0i"
  );
  if (this.isPasswordCorrect === "true") {
    return true;
  }
  return false;
});
const employeeDB = {
  getEmployeeByEmailDB: () => {},
};

const getEmployeeByEmailDBStub = sandbox.stub(
  employeeDB,
  "getEmployeeByEmailDB"
);
getEmployeeByEmailDBStub.callsFake((args) => {
  expect(args).deep.equal({ email: this.email });
  if (this.isEmployeeExists === "true") {
    if (this.isUserVarified === "true") {
      return [
        {
          id: "b85bc33a-bf23-4655-9bf1-62931337ab6f",
          employee_name: "Deep patel",
          employee_password:
            "$2b$10$uoHDv5hNZX6Vy6xBRK.Ch.fJJ.psDCR2cD.89wctVXqXsRGDggz0i",
          employee_email: "investerstocker@gmail.com",
          company_id: "3ddb4306-7c16-42fe-8473-88041623a281",
          employee_address: "Ahmedabad",
          employee_role: "Sr. Debveloper",
          is_varified: true,
        },
      ];
    }
    return [
      {
        id: "b85bc33a-bf23-4655-9bf1-62931337ab6f",
        employee_name: "Deep patel",
        employee_password:
          "$2b$10$uoHDv5hNZX6Vy6xBRK.Ch.fJJ.psDCR2cD.89wctVXqXsRGDggz0i",
        employee_email: "investerstocker@gmail.com",
        company_id: "3ddb4306-7c16-42fe-8473-88041623a281",
        employee_address: "Ahmedabad",
        employee_role: "Sr. Debveloper",
        is_varified: false,
      },
    ];
  }
  return [];
});

const loginEmployee = makeLoginEmployee({
  Joi,
  bcrypt,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
  AuthenticationError,
  AuthorizationError,
});

After(() => {
  this.email = undefined;
  this.password = undefined;
  this.isEmployeeExists = undefined;
  this.isPasswordCorrect = undefined;
  this.isUserVarified = undefined;
  sandbox.resetHistory();
});
Given(
  "email:{string}, password:{string}, isEmployeeExists:{string}, isPasswordCorrect:{string} and isUserVarified:{string} to login employee",
  (email, password, isEmployeeExists, isPasswordCorrect, isUserVarified) => {
    this.email = email || undefined;
    this.password = password || undefined;
    this.isEmployeeExists = isEmployeeExists || undefined;
    this.isPasswordCorrect = isPasswordCorrect || undefined;
    this.isUserVarified = isUserVarified || undefined;
  }
);

When("try to login employee", async () => {
  try {
    this.result = await loginEmployee({
      email: this.email,
      password: this.password,
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
  "it will throw an error with message:{string} while logging in employee",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result with employeeId:{string} while logging in employee",
  (employeeId) => {
    expect(this.result).deep.equal(JSON.parse(employeeId));
  }
);

Then(
  "compare function will be called :{int} while logging in employee",
  (compareFunctionCallCount) => {
    sinon.assert.callCount(compareStub, compareFunctionCallCount);
  }
);

Then(
  "getEmployeeByEmailDB function will be called :{int}  logging in employee",
  (getEmployeeByEmailDBFunctionCallCount) => {
    sinon.assert.callCount(
      getEmployeeByEmailDBStub,
      getEmployeeByEmailDBFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
