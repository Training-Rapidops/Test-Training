module.exports = function makeGetAllCompanyUseCase({
  Joi,
  companyDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function getAllCompany({ limit, offset }) {
    /**
     * getting all company details only
     */

    try {
      const value = validateData({ limit, offset });
      ({ limit, offset } = value);

      const result = await companyDB.getAllCompanyDB({ limit, offset });

      if (result.length > 0) {
        let data = {},
          i = 0;

        result.forEach((val) => {
          data[`${i + 1}`] = val;
          i++;
        });

        return data;
      } else {
        throw new NoDataFoundError("Company Data not found");
      }
    } catch (err) {
      // if (err.hasOwnProperty("detail")) {
      //   throw new DBError(err.detail);
      // }
      throw err;
    }
  };

  function validateData({ limit, offset }) {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().min(1).required(),
      offset: Joi.number().integer(),
    });

    const { value, error } = schema.validate({ limit, offset });
    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
