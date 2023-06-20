const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeGetAllEmployees = require("./get-all-employees");

const employeeDB = {
  getAllEmployeesDB: () => {},
};
const getAllEmployeesDBStub = sandbox.stub(employeeDB, "getAllEmployeesDB");
getAllEmployeesDBStub.callsFake((args) => {
  expect(args).deep.equal({
    limit: parseInt(this.limit),
    offset: parseInt(this.offset),
  });
  if (this.isDataExists === "true") {
    return [
      {
        id: "38bc08cc-4e9f-4767-a0ea-13b8df987bff",
        employee_name: "Safi Shaikh",
        employee_password:
          "$2b$10$o8BtP8BGkq1FlLW9viFqCevaSc44E9wJIv0I5kOVO9AKTMbMnngxq",
        employee_email: "safishaikh401@gmail.com",
        company_id: "5278c30f-e990-4bf3-8e0a-3ea653e43afd",
        employee_address: "Satelite Road",
        employee_role: "CEO",

        is_varified: true,
      },
      {
        id: "9c08d1d2-322f-4b95-b43b-184a594027c3",
        employee_name: "Ronana The Excuser",
        employee_password:
          "$2b$10$05ZbncpOt45CixdrCeE5Iu4/pZ2HVpnXn807QuJckX62AQGkfT7iu",
        employee_email: "Safi.shaikh360@gmail.com",
        company_id: "5278c30f-e990-4bf3-8e0a-3ea653e43afd",
        employee_address: "Satelite Road",
        employee_role: "owner",
        is_varified: true,
      },
    ];
  } else {
    return [];
  }
});
const functionToMock = {
  varifyAuthToken: () => {},
  updateJwtExpireTime: () => {},
  getCompanyDetailsCall: () => {},
};

const varifyAuthTokenStub = sandbox.stub(functionToMock, "varifyAuthToken");
const updateJwtExpireTimeStub = sandbox.stub(
  functionToMock,
  "updateJwtExpireTime"
);
const getCompanyDetailsCallStub = sandbox.stub(
  functionToMock,
  "getCompanyDetailsCall"
);
varifyAuthTokenStub.callsFake((args) => {
  expect(args).deep.equal({ authToken: this.authToken });
  if (this.isTokenVarified === "true") {
    if (this.isTokenExpired === "false") {
      return true;
    }
    throw {
      message:
        "Your Authorization credentials have expired, please login and try again",
    };
  }
  throw { message: "Cannot verify auth token" };
});
updateJwtExpireTimeStub.callsFake((args) => {
  expect(args).deep.equal({ authToken: this.authToken });
});
getCompanyDetailsCallStub.callsFake((args) => {
  expect(args).deep.equal({ id: "5278c30f-e990-4bf3-8e0a-3ea653e43afd" });
  return {
    id: "5278c30f-e990-4bf3-8e0a-3ea653e43afd",
    company_name: "Rapid2",
    company_address: "kjxhshx",
    contect_no: "9876543210",
    contect_email: "Safi.shaikh360@gmail.com",
  };
});
const getAllEmployees = makeGetAllEmployees({
  Joi,
  employeeDB,
  varifyAuthToken: functionToMock.varifyAuthToken,
  updateJwtExpireTime: functionToMock.updateJwtExpireTime,
  getCompanyDetailsCall: functionToMock.getCompanyDetailsCall,
  ValidationError,
  DBError,
  NoDataFoundError,
});

After(() => {
  sandbox.resetHistory();
});
Given(
  "limit:{string}, offset:{string}, authToken:{string}, isTokenVarified:{string}, isTokenExpired:{string}, isEmployeeExists:{string} and isDataExists:{string} to get all employees",
  (
    limit,
    offset,
    authToken,
    isTokenVarified,
    isTokenExpired,
    isEmployeeExists,
    isDataExists
  ) => {
    this.limit = limit || undefined;
    this.offset = offset || undefined;
    this.authToken = authToken || undefined;
    this.isTokenVarified = isTokenVarified || undefined;
    this.isTokenExpired = isTokenExpired || undefined;
    this.isEmployeeExists = isEmployeeExists || undefined;
    this.isDataExists = isDataExists || undefined;
  }
);

When("try to get all employees employee", async () => {
  try {
    this.result = await getAllEmployees({
      limit: this.limit,
      offset: this.offset,
      authToken: this.authToken,
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
  "it will throw an error with message:{string} while getting all employees",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result with result:{string} while getting all employees",
  (result) => {
    expect(this.result).deep.equal(JSON.parse(result));
  }
);

Then(
  "getAllEmployeesDB function will be called :{int} while getting all employees",
  (getAllEmployeesDBFunctionCallCount) => {
    sinon.assert.callCount(
      getAllEmployeesDBStub,
      getAllEmployeesDBFunctionCallCount
    );
  }
);

Then(
  "varifyAuthToken function will be called :{int} while getting all employees",
  (varifyAuthTokenFunctionCallCount) => {
    sinon.assert.callCount(
      varifyAuthTokenStub,
      varifyAuthTokenFunctionCallCount
    );
  }
);

Then(
  "updateJwtExpireTime function will be called :{int} while getting all employees",
  (updateJwtExpireTimeFunctionCallCount) => {
    sinon.assert.callCount(
      updateJwtExpireTimeStub,
      updateJwtExpireTimeFunctionCallCount
    );
  }
);

Then(
  "getCompanyDetailsCall function will be called :{int} while getting all employees",
  (getCompanyDetailsCallFunctionCallCount) => {
    sinon.assert.callCount(
      getCompanyDetailsCallStub,
      getCompanyDetailsCallFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
