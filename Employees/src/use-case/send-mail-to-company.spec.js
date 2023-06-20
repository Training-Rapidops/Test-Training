const { Given, When, Then, After } = require("cucumber");
const Joi = require("joi");
const sinon = require("sinon");
const expect = require("chai").expect;
const sandbox = sinon.createSandbox();
const { ValidationError, DBError, NoDataFoundError } = require("../exceptions");
const makeSendMailToCompany = require("./send-mail-to-company");

After(() => {
  this.companyEmail = undefined;
  sandbox.resetHistory();
});
Given("company mail :{string}", (companyEmail) => {
  this.companyEmail = companyEmail || undefined;
});

const nodemailer = {
  createTransport: () => {},
};

const createTransportStub = sandbox.stub(nodemailer, "createTransport");
createTransportStub.callsFake((args) => {
  return { sendMail };
  function sendMail(val) {
    return {
      accepted: ["email@mail.com"],
      rejected: [],
      ehlo: [
        "SIZE 35882577",
        "8BITMIME",
        "AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH",
        "ENHANCEDSTATUSCODES",
        "PIPELINING",
        "CHUNKING",
        "SMTPUTF8",
      ],
      envelopeTime: 1274,
      messageTime: 835,
      messageSize: 692,
      response:
        "250 2.0.0 OK  1685702550 e91-20020a17090a6fe400b002508d73f4e8sm2957605pjk.57 - gsmtp",
      envelope: {
        from: "safi.shaikh360@gmail.com",
        to: ["email@mail.com"],
      },
      messageId: "<804958e8-bef6-4798-32a7-2d79a978d27f@gmail.com>",
    };
  }
});

const sendMailToCompany = makeSendMailToCompany({
  Joi,
  nodemailer,
  ValidationError,
});

When("try to send mail to company", async () => {
  try {
    this.result = await sendMailToCompany({ companyEmail: this.companyEmail });
  } catch (err) {
    if (err.message) {
      this.error = err.message;
    } else {
      this.error = err;
    }
  }
});

Then(
  "it will throw an error with message:{string} while sending mail to company",
  (message) => {
    expect(this.error).deep.equal(message);
  }
);

Then(
  "it will give result with data:{string} while sending mail to company",
  (data) => {
    expect(this.result).deep.equal(JSON.parse(data));
  }
);

Then(
  "createTransport function will be called :{int} while sending mail to company",
  (createTransportFunctionCallCount) => {
    sinon.assert.callCount(
      createTransportStub,
      createTransportFunctionCallCount
    );
  }
);

// Then(" function will be called :<FunctionCallCount> while adding employee", (FunctionCallCount) => {
//   sinon.assert(Stub, FunctionCallCount);
// });
