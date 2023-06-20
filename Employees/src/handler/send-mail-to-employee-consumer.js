module.exports = function makeSendMailToEmployeeConsumer({
  kafka,
  sendMailToEmployee,
}) {
  return function sendMailConsumer() {
    const consumer1 = kafka.consumer({ groupId: "send-mail-employee" });

    consumer1.connect();
    consumer1.subscribe({ topic: "sendmails", fromBeginning: false });

    consumer1.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const { employeeEmail, companyEmail } = JSON.parse(
            message.value.toString()
          );

          const result = await sendMailToEmployee({ employeeEmail });
        } catch (err) {
          console.log(err);
          return true;
        }
      },
    });
  };
};
