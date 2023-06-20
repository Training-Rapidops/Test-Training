module.exports = function makeGetEmployee({
  Joi,
  employeeDB,
  getCompanyDetailsCall,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function getEmployee({ id }) {
    /**
     * get  employee individually by employee id
     */

    try {
      const value = validateData({ id });
      ({ id } = value);

      const rows = await employeeDB.getEmployeeDB({ id });

      const result = rows[0];

      if (result) {
        const companyDetails = await getCompanyDetailsCall({
          id: result.company_id,
        });

        result.companyDetails = companyDetails;

        return result;
      } else {
        throw new NoDataFoundError(`Employee With id ${id} doesn't Exists`);
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
