// const { Given, When, Then, After } = require("cucumber");
// const Joi = require("joi");
// const sinon = require("sinon");
// const expect = require("chai").expect;
// const sandbox = sinon.createSandbox();
// const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
// const makeAddEmployeeUseCase = require("./");

// After(() => {
//   sandbox.resetHistory();
// });

// Given("", () => {});

// When("", () => {
//   try {
//     this.result = data;
//   } catch (err) {
//     if (err.message) {
//       this.error = err.message;
//     } else {
//       this.error = err;
//     }
//   }
// });

// Then("it will throw an error with message:{string} while", (message) => {
//   expect(this.error).deep.equal(message);
// });

// Then("it will give result with id:{string} while", (id) => {
//   expect(this.result).deep.equal(JSON.parse(id));
// });
// // Then(" function will be called :<FunctionCallCount> while adding employee", (FunctionCallCount) => {
// //   sinon.assert.callCount(Stub, FunctionCallCount);
// // });
