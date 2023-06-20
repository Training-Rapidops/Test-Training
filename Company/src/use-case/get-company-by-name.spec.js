const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const makeGetCompanyByNameUseCase = require("./get-company-by-name");
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");

After(() => {
  this.name = undefined;
  this.isCorrectName = undefined;

  sandbox.resetHistory();
});

Given(
  "company name:{string} and isCorrectName:{string}",
  (name, isCorrectName) => {
    this.name = name || undefined;
    this.isCorrectName = isCorrectName || undefined;
  }
);

const companyDB = {
  getCompanyByNameDB: () => {},
};

const getCompanyByNameDBStub = sandbox.stub(companyDB, "getCompanyByNameDB");
getCompanyByNameDBStub.callsFake((args) => {
  if (this.isCorrectName === "true") {
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

const getCompanyByName = makeGetCompanyByNameUseCase({
  Joi,
  companyDB: companyDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

When("try to get company", async () => {
  try {
    this.result = await getCompanyByName({ name: this.name });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});
Then(
  "it will throw an error with message:{string} while getting company",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);
Then("it will give result:{string} while getting company", (result) => {
  expect(this.result).deep.equal(JSON.parse(result));
});

Then(
  "getCompanyByNameDB function will be called :{int} while adding company",
  (getCompanyByNameDBFunctionCallCount) => {
    sinon.assert.callCount(
      getCompanyByNameDBStub,
      getCompanyByNameDBFunctionCallCount
    );
  }
);
// Then(" function will be called : while adding company", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
