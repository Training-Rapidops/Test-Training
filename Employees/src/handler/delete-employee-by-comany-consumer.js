module.exports = function makeDeleteEmployeesByCompanyConsumer({
  kafka,
  deleteEmployeesByCompany,
}) {
  return async function deleteEmployeeByCompanyConsumer() {
    const consumer = kafka.consumer({ groupId: "delete-emp" });
    consumer.connect();
    consumer.subscribe({ topic: "deleteEmployees", fromBeginning: false });

    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const { companyId } = JSON.parse(message.value.toString());

          const deleteEmployeeDetails = await deleteEmployeesByCompany({
            companyId,
          });
        } catch (err) {
          console.log(err);
          return true;
        }
      },
    });
  };
};
