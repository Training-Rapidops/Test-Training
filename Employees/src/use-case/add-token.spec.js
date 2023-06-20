const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const config = require("../config");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeAddTokenUseCase = require("./add-token");

const tokenDB = {
  addTokenDB: () => {},
};

const addTokenDBStub = sandbox.stub(tokenDB, "addTokenDB");
addTokenDBStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: this.employeeId,
    jwtToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus",
    expireTime: parseInt(this.expireTime),
    browser: this.browser,
    device: this.device,
    ipAddress: this.ipAddress,
    location: "bagneux, fr, idf",
  });
  return {
    rows: [
      {
        id: "fd7fffd3-af78-4aa9-8aa6-99ea6bf72dee",
        jwt_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus",
      },
    ],
  };
});
const jwt = {
  sign: () => {},
};
const signStub = sandbox.stub(jwt, "sign");
signStub.callsFake((args) => {
  expect(args).deep.equal(
    { sub: this.employeeId, iat: Date.now() },
    config.Oauth.secretkey
  );

  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus";
});

const functionToMock = {
  getLocationFromIp: () => {},
  tokenTemplete: () => {},
};

const getLocationFromIpStub = sandbox.stub(functionToMock, "getLocationFromIp");
getLocationFromIpStub.callsFake((args) => {
  expect(args).deep.equal({ ipAddress: this.ipAddress });

  return { location: "bagneux, fr, idf" };
});

const tokenTempleteStub = sandbox.stub(functionToMock, "tokenTemplete");
tokenTempleteStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: this.employeeId,
    jwtToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus",
    expireTime: parseInt(this.expireTime),
    browser: this.browser,
    device: this.device,
    ipAddress: this.ipAddress,
    location: "bagneux, fr, idf",
  });

  let value = {
    employeeId: this.employeeId,
    jwtToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus",
    expireTime: parseInt(this.expireTime),
    browser: this.browser,
    device: this.device,
    ipAddress: this.ipAddress,
    location: "bagneux, fr, idf",
  };
  return {
    getEmployeeId: () => value.employeeId,
    getJwtToken: () => value.jwtToken,
    getExpireTime: () => value.expireTime,
    getBrowser: () => value.browser,
    getDevice: () => value.device,
    getIpAddress: () => value.ipAddress,
    getLocation: () => value.location,
  };
});

const addToken = makeAddTokenUseCase({
  Joi,
  jwt,
  config,
  getLocationFromIp: functionToMock.getLocationFromIp,
  tokenTemplete: functionToMock.tokenTemplete,
  tokenDB,
  ValidationError,
  DBError,
});

After(() => {
  this.employeeId = undefined;
  this.browser = undefined;
  this.device = undefined;
  this.ipAddress = undefined;
  this.expireTime = undefined;

  sandbox.resetHistory();
});

Given(
  "Token details employeeId:{string}, browser:{string}, device:{string}, ipAddress:{string}, expireTime:{string} while adding token",
  (employeeId, browser, device, ipAddress, expireTime) => {
    this.employeeId = employeeId || undefined;
    this.browser = browser || undefined;
    this.device = device || undefined;
    this.ipAddress = ipAddress || undefined;
    this.expireTime = expireTime || undefined;
  }
);
When("try to add token", async () => {
  try {
    this.result = await addToken({
      employeeId: this.employeeId,
      browser: this.browser,
      device: this.device,
      ipAddress: this.ipAddress,
      expireTime: this.expireTime,
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
  "it will throw error with message:{string} while adding token",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);
Then("it will give details:{string} while adding token", (result) => {
  expect(this.result).deep.equal(JSON.parse(result));
});

Then(
  "addTokenDB function will be called :{int} while adding employee",
  (addTokenDBFunctionCallCount) => {
    sinon.assert.callCount(addTokenDBStub, addTokenDBFunctionCallCount);
  }
);

Then(
  "sign function will be called :{int} while adding employee",
  (signFunctionCallCount) => {
    sinon.assert.callCount(signStub, signFunctionCallCount);
  }
);

Then(
  "getLocationFromIp function will be called :{int} while adding employee",
  (getLocationFromIpFunctionCallCount) => {
    sinon.assert.callCount(
      getLocationFromIpStub,
      getLocationFromIpFunctionCallCount
    );
  }
);

Then(
  "tokenTemplete function will be called :{int} while adding employee",
  (tokenTempleteFunctionCallCount) => {
    sinon.assert.callCount(tokenTempleteStub, tokenTempleteFunctionCallCount);
  }
);

// Then(" function will be called :<FunctionCallCount> while adding employee", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
