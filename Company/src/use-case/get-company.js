module.exports = function makeGetCompanyUseCase({
  Joi,
  companyDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function getCompany({ id }) {
    /**
     * get Company detailBy Id
     */

    try {
      const value = validateData({ id });
      ({ id } = value);

      const rows = await companyDB.getCompanyDB({ id });
      if (rows.length > 0) {
        const result = rows[0];

        return result;
      } else {
        throw new NoDataFoundError(`Company with id ${id} doesn't exists`);
      }
    } catch (err) {
      // if (err.detail) {
      //   throw new DBError(err.hasOwnProperty("detail"));
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
