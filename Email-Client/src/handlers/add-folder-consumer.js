module.exports = function makeAddFolderConsumer({
  kafka,
  fetchAndAddGmailLabels,
}) {
  return function addFolderConsumer() {
    const consumer = kafka.consumer({ groupId: "add-labels-user" });
    consumer.connect();
    consumer.subscribe({ topic: "addLabel", fromBeginning: false });

    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const userData = JSON.parse(message.value.toString());

        const result = fetchAndAddGmailLabels({ userData });

        await callProducer({ userData });
      },
    });
  };
  async function callProducer({ userData }) {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: "addMails",
      messages: [{ value: JSON.stringify({ userData }) }],
    });
    await producer.disconnect();
  }
};
