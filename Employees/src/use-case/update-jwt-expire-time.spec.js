const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeUpdateJwtExpireTime = require("./update-jwt-expire-time");

const tokenDB = { updateTokenDB: () => {} };
const updateTokenDBStub = sandbox.stub(tokenDB, "updateTokenDB");
updateTokenDBStub.callsFake((args) => {
  expect(args.jwtToken).deep.equal(this.authToken);
  if (this.isTokenValid === "true") {
    return { rowCount: 1 };
  }
  return { rowCount: 0 };
});

const updateJwtExpireTime = makeUpdateJwtExpireTime({
  Joi,
  tokenDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

After(() => {
  this.authToken = undefined;
  this.isTokenValid = undefined;
  sandbox.resetHistory();
});
Given(
  "auth token:{string} and isTokenValid:{string} to update jwt expire time",
  (authToken, isTokenValid) => {
    this.authToken = authToken || undefined;
    this.isTokenValid = isTokenValid || undefined;
  }
);

When("try to update jwt expire time", async () => {
  try {
    this.result = await updateJwtExpireTime({ authToken: this.authToken });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});

Then(
  "it will throw an error with message:{string} while updating jwt expre time",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result with affected Rows count:{string} while updating jwt expre time",
  (affectedRows) => {
    expect(this.result).deep.equal(JSON.parse(affectedRows));
  }
);

Then(
  "updateTokenDB function will be called :{int} while updating jwt expre time",
  (updateTokenDBFunctionCallCount) => {
    sinon.assert.callCount(updateTokenDBStub, updateTokenDBFunctionCallCount);
  }
);

// Then(" function will be called :<FunctionCallCount> while", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
