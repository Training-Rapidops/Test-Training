module.exports = function makeDeleteCompanyUseCase({
  Joi,
  companyDB,
  deleteEmployeesByCompanynameCall,
  producer,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function deleteCompany({ id }) {
    /**
     * Deleted Company and produced topic to delete employee related to this company via handler in employee port
     */

    try {
      const value = validateData({ id });
      ({ id } = value);

      const result = await companyDB.deleteCompanyDB({ id });

      await producer.connect();
      await producer.send({
        topic: "deleteEmployees",
        messages: [
          {
            value: JSON.stringify({
              companyId: id,
            }),
          },
        ],
      });
      await producer.disconnect();

      // const deleteEmployeesDetails = await deleteEmployeesByCompanynameCall({
      //   id,
      // });

      const affectedRows = result.rowCount;

      if (affectedRows > 0) {
        return { affectedRows };
      } else {
        throw new NoDataFoundError("Company Already Doesn't Exists");
      }
    } catch (err) {
      // if (err.hasOwnProperty("detail")) {
      //   throw new DBError(err.detail);
      // }
      throw err;
    }
  };

  function validateData({ id }) {
    const schema = Joi.object().keys({
      id: Joi.string().guid().required(),
    });

    const { value, error } = schema.validate({ id });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
