module.exports = function makeDeleteEmployeesByCompany({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function deleteEmployeesByCompany({ companyId }) {
    /**
     * deleted all Employee by Company Id
     * This use case mainly used by employee port when company gets deleted
     */

    try {
      const value = validateData({ companyId });
      ({ companyId } = value);

      const result = await employeeDB.deleteEmployeesByCompanyDB({ companyId });

      affectedRows = result.rowCount;
      if (affectedRows > 0) {
        return { affectedRows };
      } else {
        throw new NoDataFoundError(
          `No Employees With Company id ${companyId} Exists`
        );
      }
    } catch (err) {
      // if (err.hasOwnProperty("detail")) {
      //   throw new DBError(err.detail);
      // }
      throw err;
    }
  };

  function validateData({ companyId }) {
    const schema = Joi.object().keys({
      companyId: Joi.string().guid().required(),
    });

    const { value, error } = schema.validate({ companyId });
    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
