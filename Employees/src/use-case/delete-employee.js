module.exports = function makeDeleteEmployee({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function deleteEmployee({ id }) {
    /**
     * Deleted individual Employee by Id
     */

    try {
      const value = validateData({ id });
      ({ id } = value);

      const result = await employeeDB.deleteEmployeeDB({ id });

      const affectedRows = result.rowCount;
      if (affectedRows > 0) {
        return { affectedRows };
      } else {
        throw new NoDataFoundError(
          `Employee With Given Id:${id} Already Doesnt exists`
        );
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
