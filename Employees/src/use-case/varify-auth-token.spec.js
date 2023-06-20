const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const config = require("../config");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const {
  ValidationError,
  DBError,
  AuthorizationError,
} = require("../exceptions");
const makeVarifyAuthToken = require("./varify-auth-token");

const jwt = {
  verify: () => {},
};
const varifyStub = sandbox.stub(jwt, "verify");
varifyStub.callsFake((args) => {
  expect(args).deep.equal(this.authToken, config.Oauth.secretkey);

  if (this.isTokenValid === "true") {
    return { sub: "9c08d1d2-322f-4b95-b43b-184a594027c3" };
  } else {
    throw { message: "Cannot verify auth token" };
  }
});

const tokenDB = { getTokenByEmpId: () => {} };
const getTokenByEmpIdStub = sandbox.stub(tokenDB, "getTokenByEmpId");
getTokenByEmpIdStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: "9c08d1d2-322f-4b95-b43b-184a594027c3",
  });
  if (this.isEmployeeExists === "true") {
    if (this.isTokenExpired === "true") {
      return [
        {
          jwt_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus",
          expire_time: 168630332749900,
        },
        {
          jwt_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzOGJjMDhjYy00ZTlmLTQ3NjctYTBlYS0xM2I4ZGY5ODdiZmYiLCJpYXQiOjE2ODYyOTk2OTg3NDF9.ofCs9GfJq7CP_5w9Vg7K5CkJ_EOnT_DpNpBw4XOiFIY",
          expire_time: 1686303327499,
        },
      ];
    }
    return [
      {
        jwt_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3Mjc0OTl9.SWszr3OGcCMlnkjx_Slv0uQjxRz98f_LtYPSX8ACrus",
        expire_time: 1686303327499,
      },
      {
        jwt_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzOGJjMDhjYy00ZTlmLTQ3NjctYTBlYS0xM2I4ZGY5ODdiZmYiLCJpYXQiOjE2ODYyOTk2OTg3NDF9.ofCs9GfJq7CP_5w9Vg7K5CkJ_EOnT_DpNpBw4XOiFIY",
        expire_time: 1686303327499,
      },
    ];
  }
  return [];
});

const varifyAuthToken = makeVarifyAuthToken({
  Joi,
  jwt,
  config,
  tokenDB,
  ValidationError,
  DBError,
  AuthorizationError,
});

After(() => {
  this.authToken = undefined;
  this.isTokenValid = undefined;
  this.isEmployeeExists = undefined;
  this.isTokenExpired = undefined;
  sandbox.resetHistory();
});
Given(
  "auth token:{string}, isTokenValid:{string}, isEmployeeExists:{string}, isTokenExpired:{string} to varify auth token",
  (authToken, isTokenValid, isEmployeeExists, isTokenExpired) => {
    this.authToken = authToken || undefined;
    this.isTokenValid = isTokenValid || undefined;
    this.isEmployeeExists = isEmployeeExists || undefined;
    this.isTokenExpired = isTokenExpired || undefined;
  }
);

When("try to varify auth token", async () => {
  try {
    this.result = await varifyAuthToken({ authToken: this.authToken });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});

Then(
  "it will throw an error with message:{string} while varifying auth token",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result with answer:{string} while varifying auth token",
  (answer) => {
    expect(this.result).deep.equal(JSON.parse(answer));
  }
);

Then(
  "varify function will be called :{int} while varifying auth token",
  (varifyFunctionCallCount) => {
    sinon.assert.callCount(varifyStub, varifyFunctionCallCount);
  }
);

Then(
  "getTokenByEmpId function will be called :{int} while varifying auth token",
  (getTokenByEmpIdFunctionCallCount) => {
    sinon.assert.callCount(
      getTokenByEmpIdStub,
      getTokenByEmpIdFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
