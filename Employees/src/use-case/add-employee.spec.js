const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");

const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeAddEmployeeUseCase = require("./add-employee");

After(() => {
  this.name = undefined;
  this.address = undefined;
  this.password = undefined;
  this.companyName = undefined;
  this.email = undefined;
  this.role = undefined;

  sandbox.resetHistory();
});
Given(
  "employee details  name:{string}, address:{string}, email:{string}, password:{string}, companyName:{string},role:{string}, profilePhoto:{string}, companyExists:{string} While adding employee",
  (
    name,
    address,
    email,
    password,
    companyName,
    role,
    profilePhoto,
    companyExists
  ) => {
    this.name = name || undefined;
    this.address = address || undefined;
    this.password = password || undefined;
    this.companyName = companyName || undefined;
    this.role = role || undefined;
    this.email = email || undefined;
    this.profilePhoto = profilePhoto ? JSON.parse(profilePhoto) : undefined;
    this.companyExists = companyExists || undefined;
  }
);

const employeeDB = {
  addEmployeeDB: () => {},
};
const addEmployeeDBStub = sandbox.stub(employeeDB, "addEmployeeDB");
addEmployeeDBStub.callsFake((args) => {
  expect(args).deep.equal({
    name: this.name,
    address: this.address,
    email: this.email,
    password: "$2b$10$TU.q2fY2o8mZIQwx5XTmDecA5iLuP6dQGK1Ze5FlUZUwitwr450t6",
    companyId: "7e0b46a9-d895-4ca8-ac50-c46b2d18cd05",
    role: this.role,
    profilePhoto: this.profilePhoto.originalname,
  });

  return { rows: [{ id: "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a" }] };
});

const functionToMock = {
  getCompanyByNameCall: () => {},
  employeeTemplet: () => {},
  uploadPrfilePhoto: () => {},
  updateProfilePhoto: () => {},
};

const getCompanyByNameCallStub = sandbox.stub(
  functionToMock,
  "getCompanyByNameCall"
);
getCompanyByNameCallStub.callsFake((args) => {
  expect(args).deep.equal({ name: this.companyName });
  if (this.companyExists === "true") {
    return {
      id: "7e0b46a9-d895-4ca8-ac50-c46b2d18cd05",
      company_name: "abbbb1",
      company_address: "kjxhshx",
      contect_no: "9876543210",
      contect_email: "email2@mail.com",
    };
  } else {
    throw {
      status: "error",
      name: "NoDataFoundError",
      message: `Company with name ${this.companyName} doesn't exists`,
      date: "2023-06-01T06:21:58.521Z",
    };
  }
});

const bcrypt = {
  hash: () => {},
};
const hashStub = sandbox.stub(bcrypt, "hash");
hashStub.callsFake((args) => {
  expect(args).deep.equal(this.password, 10);

  return "$2b$10$TU.q2fY2o8mZIQwx5XTmDecA5iLuP6dQGK1Ze5FlUZUwitwr450t6";
});

const employeeTempletStub = sandbox.stub(functionToMock, "employeeTemplet");
employeeTempletStub.callsFake((args) => {
  const value = {
    name: this.name,
    address: this.address,
    password: "$2b$10$TU.q2fY2o8mZIQwx5XTmDecA5iLuP6dQGK1Ze5FlUZUwitwr450t6",
    email: this.email,
    companyId: "7e0b46a9-d895-4ca8-ac50-c46b2d18cd05",
    role: this.role,
    profilePhoto: this.profilePhoto.originalname,
  };
  expect(args).deep.equal(value);

  return {
    getName: () => value.name,
    getEmail: () => value.email,
    getAddress: () => value.address,
    getPassword: () => value.password,
    getCompanyId: () => value.companyId,
    getRole: () => value.role,
    getProfilePhoto: () => value.profilePhoto,
  };
});

const producer = {
  connect: () => {},
  send: () => {},
  disconnect: () => {},
};

const uploadPrfilePhotoStub = sandbox.stub(functionToMock, "uploadPrfilePhoto");
uploadPrfilePhotoStub.callsFake((args) => {
  expect(args).deep.equal({
    id: "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a",
    fileName: this.profilePhoto.originalname,
    profilePhoto: this.profilePhoto.buffer,
  });

  return { fileName: "trainee-data/safishaikh/file.exe" };
});

const updateProfilePhotoStub = sandbox.stub(
  functionToMock,
  "updateProfilePhoto"
);
updateProfilePhotoStub.callsFake((args) => {
  expect(args).deep.equal({
    id: "1cfe0d8b-0f6a-4ffc-b1b1-ce43560add4a",
    fileName: "trainee-data/safishaikh/file.exe",
  });

  return { rowCount: 1 };
});

const addEmployee = makeAddEmployeeUseCase({
  Joi,
  producer,
  bcrypt,
  employeeTemplet: functionToMock.employeeTemplet,
  employeeDB,
  getCompanyByNameCall: functionToMock.getCompanyByNameCall,
  uploadPrfilePhoto: functionToMock.uploadPrfilePhoto,
  updateProfilePhoto: functionToMock.updateProfilePhoto,
  ValidationError,
  DBError,
});

When("try to add employee", async () => {
  try {
    this.result = await addEmployee({
      name: this.name,
      address: this.address,
      password: this.password,
      email: this.email,
      companyName: this.companyName,
      role: this.role,
      profilePhoto: this.profilePhoto,
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
  "it will throw an error with message:{string} while adding employee",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then("it will give result with id:{string} while adding employee", (id) => {
  expect(this.result).deep.equal(JSON.parse(id));
});

Then(
  "addEmployeeDB function will be called :{int} while adding employee",
  (addEmployeeDBFunctionCallCount) => {
    sinon.assert.callCount(addEmployeeDBStub, addEmployeeDBFunctionCallCount);
  }
);
Then(
  "employeeTemplet function will be called :{int} while adding employee",
  (employeeTempletFunctionCallCount) => {
    sinon.assert.callCount(
      employeeTempletStub,
      employeeTempletFunctionCallCount
    );
  }
);
Then(
  "getCompanyByNameCall function will be called :{int} while adding employee",
  (getCompanyByNameCallFunctionCallCount) => {
    sinon.assert.callCount(
      getCompanyByNameCallStub,
      getCompanyByNameCallFunctionCallCount
    );
  }
);

Then(
  "uploadPrfilePhoto function will be called :{int} while adding employee",
  (uploadPrfilePhotoFunctionCallCount) => {
    sinon.assert.callCount(
      uploadPrfilePhotoStub,
      uploadPrfilePhotoFunctionCallCount
    );
  }
);

Then(
  "updateProfilePhoto function will be called :{int} while adding employee",
  (updateProfilePhotoFunctionCallCount) => {
    sinon.assert.callCount(
      updateProfilePhotoStub,
      updateProfilePhotoFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while adding employee", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
