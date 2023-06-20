const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const {
  addMailsConsumerUsecase,
  fetchAndAddGmailLabels,
} = require("../Use-Case");

const makeAddFolderConsumer = require("./add-folder-consumer");
const addFolderConsumer = makeAddFolderConsumer({
  kafka,
  fetchAndAddGmailLabels,
});
const makeAddMailsConsumer = require("./add-mails-consumer");
const addMailsConsumer = makeAddMailsConsumer({
  kafka,
  addMailsConsumerUsecase,
});

module.exports = { addFolderConsumer, addMailsConsumer };
