const config = require("../config");

const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "app",
  brokers: config.kafka.brokerList,
});

const {
  deleteEmployeesByCompany,
  sendMailToCompany,
  sendMailToEmployee,
} = require("../use-case");

const makeDeleteEmployeesByCompanyConsumer = require("./delete-employee-by-comany-consumer");
const deleteEmployeeByCompanyConsumer = makeDeleteEmployeesByCompanyConsumer({
  kafka,
  deleteEmployeesByCompany,
});

const makeSendMailToEmployeeConsumer = require("./send-mail-to-employee-consumer");
const sendMailToEmployeeConsumer = makeSendMailToEmployeeConsumer({
  kafka,
  sendMailToEmployee,
});

const makeSendMailToCompanyConsumer = require("./send-mail-to-company-consumer");
const sendMailToCompanyConsumer = makeSendMailToCompanyConsumer({
  kafka,
  sendMailToCompany,
});

(async () => {
  deleteEmployeeByCompanyConsumer();
  sendMailToEmployeeConsumer();
  sendMailToCompanyConsumer();
})();
