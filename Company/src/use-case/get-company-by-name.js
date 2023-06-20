module.exports = function makeGetCompanyByNameUseCase({
  Joi,
  companyDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function getCompanyByName({ name }) {
    /**
     * this use case is created to be called as service to get company details when employee only has company name
     * so this use case will provide company id and other details that needs to be added to employee table
     */

    try {
      const value = validateData({ name });
      ({ name } = value);

      const rows = await companyDB.getCompanyByNameDB({ name });

      if (rows.length > 0) {
        const result = rows[0];
        return result;
      } else {
        throw new NoDataFoundError(`Company with name ${name} doesn't exists`);
      }
    } catch (err) {
      // if (err.hasOwnProperty("detail")) {
      //   throw new DBError(err.detail);
      // }
      throw err;
    }
  };

  function validateData({ name }) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).required(),
    });

    const { value, error } = schema.validate({ name });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
