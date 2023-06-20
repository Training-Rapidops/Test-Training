module.exports = function makeGetAllEmployees({
  Joi,
  employeeDB,
  varifyAuthToken,
  updateJwtExpireTime,
  getCompanyDetailsCall,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function getAllEmployees({ limit, offset, authToken }) {
    /**
     *
     * get all employees
     * completed with pagination :)
     */

    try {
      const value = validateData({ limit, offset, authToken });
      ({ limit, offset, authToken } = value);

      const isVarified = await varifyAuthToken({ authToken });

      if (isVarified) {
        const result = await employeeDB.getAllEmployeesDB({ limit, offset });

        if (result.length > 0) {
          let employeeObj = {},
            i = 0;
          for (let i = 0; i < result.length; i++) {
            const companyDetails = await getCompanyDetailsCall({
              id: result[i].company_id,
            });

            result[i].companyDetails = companyDetails;

            employeeObj[i + 1] = result[i];
          }

          await updateJwtExpireTime({ authToken });

          return employeeObj;
        } else {
          throw new NoDataFoundError(`No Emoloyee data Found`);
        }
      }
    } catch (err) {
      // if (err.hasOwnProperty("detail")) {
      //   throw new DBError(err.detail);
      // }
      throw err;
    }
  };

  function validateData({ limit, offset, authToken }) {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().required(),
      offset: Joi.number().integer(),
      authToken: Joi.string().required(),
    });

    const { value, error } = schema.validate({ limit, offset, authToken });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
