const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeAddCompany = require("./add-company");

After(() => {
  this.name = undefined;
  this.address = undefined;
  this.ownerName = undefined;
  this.ownerAddress = undefined;
  this.ownerMail = undefined;
  this.ownerPassword = undefined;
  this.ownerPhoto = undefined;
  this.contectNo = undefined;
  this.contectEmail = undefined;
  this.isCorrectName = undefined;

  sandbox.resetHistory();
});

Given(
  "company details name:{string},address:{string},ownerName:{string},ownerAddress:{string},ownerMail:{string},ownerPassword:{string},ownerPhoto:{string},contectNo:{string},contectEmail:{string},isCorrectName:{string}",
  (
    name,
    address,
    ownerName,
    ownerAddress,
    ownerMail,
    ownerPassword,
    ownerPhoto,
    contectNo,
    contectEmail,
    isCorrectName
  ) => {
    this.name = name || undefined;
    this.address = address || undefined;
    this.ownerName = ownerName || undefined;
    this.ownerAddress = ownerAddress || undefined;
    this.ownerMail = ownerMail || undefined;
    this.ownerPassword = ownerPassword || undefined;
    this.ownerPhoto = ownerPhoto ? JSON.parse(ownerPhoto) : undefined;
    this.contectNo = contectNo || undefined;
    this.contectEmail = contectEmail || undefined;
    this.isCorrectName = isCorrectName || undefined;
  }
);

const companyDB = {
  addcompanyDB: () => {},
};
const functionToMock = {
  companyTemplet: () => {},
  addOwnerCall: () => {},
};

const addcompanyDBStub = sandbox.stub(companyDB, "addcompanyDB");
const companyTempletStub = sandbox.stub(functionToMock, "companyTemplet");
const addOwnerCallStub = sandbox.stub(functionToMock, "addOwnerCall");

addcompanyDBStub.callsFake((args) => {
  expect(args).deep.equal({
    name: this.name,
    address: this.address,
    contectNo: parseInt(this.contectNo),
    contectEmail: this.contectEmail,
  });

  if (this.isCorrectName === "true") {
    result = { rows: [{ id: "ycgyusgcyugcyugsac" }] };

    return result;
  } else {
    expect(args.name).deep.equal("Rapidops2");
    throw {
      message: `Key (company_name)=(${this.name}) already exists`,
    };
  }
});
companyTempletStub.callsFake((args) => {
  expect(args).deep.equal({
    name: this.name,
    address: this.address,
    contectNo: parseInt(this.contectNo),
    contectEmail: this.contectEmail,
  });
  const value = {
    name: this.name,
    address: this.address,
    contectNo: parseInt(this.contectNo),
    contectEmail: this.contectEmail,
  };
  if (this.contectEmail === "email2@mail.com") {
  }
  return {
    getName: () => value.name,
    getAddress: () => value.address,
    getContectNo: () => value.contectNo,
    getContectEmail: () => value.contectEmail,
  };
});
addOwnerCallStub.callsFake((args) => {
  expect(args).deep.equal({
    name: this.ownerName,
    email: this.ownerMail,
    password: this.ownerPassword,
    address: this.ownerAddress,
    companyName: this.name,
    role: "owner",
    profilePhoto: this.ownerPhoto,
  });
  return { id: "223131321313131321" };
});

const addCompany = makeAddCompany({
  Joi,
  companyTemplet: functionToMock.companyTemplet,
  companyDB: companyDB,
  addOwnerCall: functionToMock.addOwnerCall,
  ValidationError,
  DBError,
});

When("try to add company", async () => {
  try {
    this.result = await addCompany({
      name: this.name,
      address: this.address,
      ownerName: this.ownerName,
      ownerAddress: this.ownerAddress,
      ownerMail: this.ownerMail,
      ownerPassword: this.ownerPassword,
      ownerPhoto: this.ownerPhoto,
      contectNo: this.contectNo,
      contectEmail: this.contectEmail,
    });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});

Then("it will throw an error with message:{string}", (message) => {
  expect(this.error).deep.equal(message);
});

Then("it will give result with id:{string}", (id) => {
  expect(this.result).deep.equal(JSON.parse(id));
});

Then(
  "addOwnerCall function will be called :{int} while adding company",
  (addOwnerCallFunctionCallCount) => {
    sinon.assert.callCount(addOwnerCallStub, addOwnerCallFunctionCallCount);
  }
);

Then(
  "companyTemplet function will be called :{int} while adding company",
  (companyTempletFunctionCallCount) => {
    sinon.assert.callCount(companyTempletStub, companyTempletFunctionCallCount);
  }
);

Then(
  "addcompanyDB function will be called :{int} while adding company",
  (addcompanyDBFunctionCallCount) => {
    sinon.assert.callCount(addcompanyDBStub, addcompanyDBFunctionCallCount);
  }
);

// Then(" function will be called : while adding company", (FunctionCallCount) => {
//   sinon.assert(Stub, FunctionCallCount);
// });
