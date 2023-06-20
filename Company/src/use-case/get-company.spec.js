const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeGetCompanyUseCase = require("./get-company");

After(() => {
  this.id = undefined;
  this.isCorrectId = undefined;

  sandbox.resetHistory();
});

Given(
  "company id:{string} and isCorrectId:{string} with id",
  (id, isCorrectId) => {
    this.id = id || undefined;
    this.isCorrectId = isCorrectId || undefined;
  }
);

const companyDB = {
  getCompanyDB: () => {},
};

const getCompanyDBStub = sandbox.stub(companyDB, "getCompanyDB");
getCompanyDBStub.callsFake((args) => {
  if (this.isCorrectId === "true") {
    return [
      {
        id: "70e27e3d-46c9-4d9e-bf27-eb993bfe7e06",
        company_name: "hsahs",
        company_address: "kjxhshx",
        contect_no: "9876543210",
        contect_email: "email2@mail.com",
      },
    ];
  } else {
    return [];
  }
});

const getCompany = makeGetCompanyUseCase({
  Joi,
  companyDB: companyDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

When("try to get company with id", async () => {
  try {
    this.result = await getCompany({ id: this.id });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});
Then(
  "it will throw an error with message:{string} while getting company with id",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);
Then("it will give result:{string} while getting company with id", (result) => {
  expect(this.result).deep.equal(JSON.parse(result));
});

Then(
  "getCompanyDB function will be called :{int} while adding company",
  (getCompanyDBFunctionCallCount) => {
    sinon.assert.callCount(getCompanyDBStub, getCompanyDBFunctionCallCount);
  }
);
// Then(" function will be called : while adding company", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
