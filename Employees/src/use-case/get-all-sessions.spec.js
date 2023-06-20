const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeGetAllSessions = require("./get-all-sessions");

const tokenDB = {
  getAllSessionsDB: () => {},
};
const getAllSessionsDBStub = sandbox.stub(tokenDB, "getAllSessionsDB");
getAllSessionsDBStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: this.employeeId,
    sortBy: this.sortBy,
    filterBy: this.filterBy,
  });
  if (this.isSortByGiven === "true") {
    if (this.isFilterByGiven === "true") {
      return [
        {
          id: "362046a1-243b-433e-bcfd-e2eba2cc6cf2",
          employee_id: "9c08d1d2-322f-4b95-b43b-184a594027c3",
          jwt_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3MjY4Mzl9.MoT2wjQPohJdWxeQUGm1ztJlisGui4xuEX5mdUHbGS8",
          expire_time: "1686303326840",
          browser: "postman",
          device: "linux",
          ip_address: "103.238.107.135",
          location: "ahmedabad, in, gj",
          createdAt: "2023-06-09T14:05:26.840Z",
          updatedAt: "2023-06-09T14:05:26.840Z",
        },
      ];
    }
    return [
      {
        id: "362046a1-243b-433e-bcfd-e2eba2cc6cf2",
        employee_id: "9c08d1d2-322f-4b95-b43b-184a594027c3",
        jwt_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3MjY4Mzl9.MoT2wjQPohJdWxeQUGm1ztJlisGui4xuEX5mdUHbGS8",
        expire_time: "1686303326840",
        browser: "postman",
        device: "linux",
        ip_address: "103.238.107.135",
        location: "ahmedabad, in, gj",
        createdAt: "2023-06-09T14:05:26.840Z",
        updatedAt: "2023-06-09T14:05:26.840Z",
      },
      {
        id: "1847ecff-5622-4698-8663-9249cbeee00f",
        employee_id: "9c08d1d2-322f-4b95-b43b-184a594027c3",
        jwt_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3MzUyMzF9.MJywdpzjqXBXXnA-TVp6P9-D66SQVv1JaKpoEmaSP88",
        expire_time: "1686303335232",
        browser: "postman",
        device: "linux",
        ip_address: "2a01:e35:8bd9:8bb0:92b:8628:5ca5:5f2b",
        location: "bagneux, fr, idf",
        createdAt: "2023-06-09T14:05:35.232Z",
        updatedAt: "2023-06-09T14:05:35.232Z",
      },
    ];
  } else if (this.isFilterByGiven === "true") {
    return [
      {
        id: "362046a1-243b-433e-bcfd-e2eba2cc6cf2",
        employee_id: "9c08d1d2-322f-4b95-b43b-184a594027c3",
        jwt_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3MjY4Mzl9.MoT2wjQPohJdWxeQUGm1ztJlisGui4xuEX5mdUHbGS8",
        expire_time: "1686303326840",
        browser: "postman",
        device: "linux",
        ip_address: "103.238.107.135",
        location: "ahmedabad, in, gj",
        createdAt: "2023-06-09T14:05:26.840Z",
        updatedAt: "2023-06-09T14:05:26.840Z",
      },
    ];
  }
  return [
    {
      id: "1847ecff-5622-4698-8663-9249cbeee00f",
      employee_id: "9c08d1d2-322f-4b95-b43b-184a594027c3",
      jwt_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3MzUyMzF9.MJywdpzjqXBXXnA-TVp6P9-D66SQVv1JaKpoEmaSP88",
      expire_time: "1686303335232",
      browser: "postman",
      device: "linux",
      ip_address: "2a01:e35:8bd9:8bb0:92b:8628:5ca5:5f2b",
      location: "bagneux, fr, idf",
      createdAt: "2023-06-09T14:05:35.232Z",
      updatedAt: "2023-06-09T14:05:35.232Z",
    },
    {
      id: "362046a1-243b-433e-bcfd-e2eba2cc6cf2",
      employee_id: "9c08d1d2-322f-4b95-b43b-184a594027c3",
      jwt_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3MjY4Mzl9.MoT2wjQPohJdWxeQUGm1ztJlisGui4xuEX5mdUHbGS8",
      expire_time: "1686303326840",
      browser: "postman",
      device: "linux",
      ip_address: "103.238.107.135",
      location: "ahmedabad, in, gj",
      createdAt: "2023-06-09T14:05:26.840Z",
      updatedAt: "2023-06-09T14:05:26.840Z",
    },
  ];
});

const getAllSessions = makeGetAllSessions({
  Joi,
  tokenDB,
  ValidationError,
  DBError,
  NoDataFoundError,
});

After(() => {
  this.employeeId = undefined;
  this.sortBy = undefined;
  this.filterBy = undefined;
  this.isFilterByGiven = undefined;
  this.isSortByGiven = undefined;
  sandbox.resetHistory();
});
Given(
  "employee id:{string}, sortBy:{string}, filterBy:{string} isSortByGiven:{string} and isFilterByGiven:{string} to get all sessions",
  (employeeId, sortBy, filterBy, isFilterByGiven, isSortByGiven) => {
    this.employeeId = employeeId || undefined;
    this.sortBy = sortBy || undefined;
    this.filterBy = filterBy ? JSON.parse(filterBy) : undefined;
    this.isFilterByGiven = isFilterByGiven || undefined;
    this.isSortByGiven = isSortByGiven || undefined;
  }
);

When("try to get all sesions", async () => {
  try {
    this.result = await getAllSessions({
      employeeId: this.employeeId,
      sortBy: this.sortBy,
      filterBy: this.filterBy,
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
  "it will throw an error with message:{string} while getting all sessions",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then("it will give result:{string} while getting all sessions", (result) => {
  expect(this.result).deep.equal(JSON.parse(result));
});

Then(
  "getAllSessionsDB function will be called :{int} while getting all sessions",
  (getAllSessionsDBFunctionCallCount) => {
    sinon.assert.callCount(
      getAllSessionsDBStub,
      getAllSessionsDBFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while", (FunctionCallCount) => {
//   sinon.assert.callCount(Stub, FunctionCallCount);
// });
