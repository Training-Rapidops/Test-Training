module.exports = function makeSendMailToCompanyConsumer({
  kafka,
  sendMailToCompany,
}) {
  return function sendMailToCompanyConsumer() {
    const consumer2 = kafka.consumer({ groupId: "send-mail-company" });
    consumer2.connect();
    consumer2.subscribe({ topic: "sendmails", fromBeginning: false });
    consumer2.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const { employeeEmail, companyEmail } = JSON.parse(
            message.value.toString()
          );
          const result = await sendMailToCompany({ companyEmail });
        } catch (err) {
          console.log(err);
          return true;
        }
      },
    });
  };
};
