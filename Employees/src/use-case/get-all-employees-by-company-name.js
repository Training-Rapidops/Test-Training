module.exports = function makeGetAllEmployeesByCompanyName({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function getAllEmployeesByCompanyName({
    limit,
    offset,
    companyId,
  }) {
    /**
     * get All Employees By company Name
     * it is mainly used by company port to show employee details of one company
     */

    try {
      const value = validateData({ limit, offset, companyId });
      ({ limit, offset, companyId } = value);

      const result = await employeeDB.getAllEmployeesByCompanyNameDB({
        limit,
        offset,
        companyId,
      });

      if (result.length > 0) {
        let employeeObj = {},
          i = 0;
        for (let i = 0; i < result.length; i++) {
          employeeObj[i + 1] = result[i];
        }
        return employeeObj;
      } else {
        throw new NoDataFoundError(
          `No employee Data With Company Id: ${companyId} found`
        );
      }
    } catch (err) {
      // if (err.hasOwnProperty("detail")) {
      //   console.log(err);
      //   throw new DBError(err.detail);
      // }
      throw err;
    }
  };

  function validateData({ limit, offset, companyId }) {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().min(1).required(),
      offset: Joi.number().integer(),
      companyId: Joi.string().guid().required(),
    });

    const { value, error } = schema.validate({ limit, offset, companyId });
    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
