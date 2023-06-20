const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");

const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeGetLocationFromIp = require("./get-location-from-ip");

const geoip = { lookup: () => {} };

const lookupStub = sandbox.stub(geoip, "lookup");
lookupStub.callsFake((args) => {
  expect(args).deep.equal(this.ipAddress);

  return {
    city: "bagneux",
    country: "fr",
    region: "idf",
  };
});

const getLocationFromIp = makeGetLocationFromIp({
  Joi,
  geoip,
  ValidationError,
});

After(() => {
  this.ipAddress = undefined;
  sandbox.resetHistory();
});

Given("ip address:{string} to get location", (ipAddress) => {
  this.ipAddress = ipAddress || undefined;
});
When("try to add location from ip", async () => {
  try {
    this.result = await getLocationFromIp({ ipAddress: this.ipAddress });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});
Then(
  "it will throw error with message:{string} while getting location from ip",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);
Then(
  "it will give location:{string} while getting location from ip",
  (location) => {
    expect(this.result).deep.equal(JSON.parse(location));
  }
);

Then(
  "lookup function will be called :{int} while adding employee",
  (lookupFunctionCallCount) => {
    sinon.assert.callCount(lookupStub, lookupFunctionCallCount);
  }
);

// Then(" function will be called :<FunctionCallCount> while adding employee", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
