module.exports = function makeVarifyEmployee({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function varifyEmployee({ email }) {
    try {
      const value = validateData({ email });
      ({ email } = value);

      const result = await employeeDB.varifyEmployeeDB({ email });

      const affectedRows = result.rowCount;
      if (affectedRows > 0) {
        return affectedRows;
      } else {
        throw new NoDataFoundError(
          `Employee with email ${email} was not found`
        );
      }
    } catch (err) {
      // if (err.detail) {
      //   throw new DBError(err.detail);
      // }
      throw err;
    }
  };

  function validateData({ email }) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });
    const { value, error } = schema.validate({ email });
    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
