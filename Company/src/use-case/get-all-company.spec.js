const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const makeGetAllCompanyUseCase = require("./get-all-company");
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");

After(() => {
  this.limit = undefined;
  this.offset = undefined;
  this.isDataAvailable = undefined;

  sandbox.resetHistory();
});

Given(
  "limit of company details :{string}, offset:{string} and isDataAvailable:{string}",
  (limit, offset, isDataAvailable) => {
    this.limit = limit || undefined;
    this.offset = offset || undefined;
    this.isDataAvailable = isDataAvailable || undefined;
  }
);

const companyDB = {
  getAllCompanyDB: () => {},
};

const getAllCompanyDBStub = sandbox.stub(companyDB, "getAllCompanyDB");
getAllCompanyDBStub.callsFake((args) => {
  expect(args).deep.equal({
    limit: parseInt(this.limit),
    offset: parseInt(this.offset),
  });
  if (this.isDataAvailable === "true") {
    return [
      {
        id: "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a",
        company_name: "aaaa",
        company_address: "kjxhshx",
        contect_no: "9876543210",
        contect_email: "email2@mail.com",
      },
    ];
  } else {
    return [];
  }
});

const getAllCompany = makeGetAllCompanyUseCase({
  Joi,
  companyDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

When("try to get all company data", async () => {
  try {
    this.result = await getAllCompany({
      limit: this.limit,
      offset: this.offset,
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
  "it will throw an error with message:{string} while getting all company",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then("it will wull give company details object :{string}", (CompanyDetails) => {
  expect(this.result).deep.equal(JSON.parse(CompanyDetails));
});

// Then(" function will be called : while adding company", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
Then(
  "getAllCompanyDB function will be called :{int} while adding company",
  (getAllCompanyDBFunctionCallCount) => {
    sinon.assert.callCount(
      getAllCompanyDBStub,
      getAllCompanyDBFunctionCallCount
    );
  }
);
