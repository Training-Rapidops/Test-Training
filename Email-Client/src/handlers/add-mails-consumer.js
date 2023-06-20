module.exports = function makeAddMailsConsumer({
  kafka,
  addMailsConsumerUsecase,
}) {
  return function addMailsConsumer() {
    const consumer = kafka.consumer({ groupId: "add-mails-user" });
    consumer.connect();
    consumer.subscribe({ topic: "addMails", fromBeginning: false });
    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const { userData } = JSON.parse(message.value.toString());

          const addMailsConsumerUsecaseDetails = await addMailsConsumerUsecase({
            userData,
          });

          // await callProducer({ userData });
        } catch (err) {
          console.log(err, "6666666666666666666666666666666666666");
          return true;
        }
      },
    });
  };

  // async function callProducer({ userData }) {
  //   const { id, name, email, picturePath, access_token, refresh_token } =
  //     userData;
  //   const producer = kafka.producer();
  //   await producer.connect();
  //   await producer.send({
  //     topic: "addMails",
  //     messages: [
  //       {
  //         value: JSON.stringify({ userData }),
  //       },
  //     ],
  //   });
  //   await producer.disconnect();
  // }
};
