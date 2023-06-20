module.exports = function makeUpdateJwtExpireTime({
  Joi,
  tokenDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function updateJwtExpireTime({ authToken }) {
    try {
      const value = validateData({ authToken });
      ({ authToken } = value);

      const expireTime = Date.now() + 60 * 60 * 1000;

      const result = await tokenDB.updateTokenDB({
        jwtToken: authToken,
        expireTime,
      });

      const affectedRows = result.rowCount;

      if (affectedRows > 0) {
        return { affectedRows };
      } else {
        throw new NoDataFoundError(
          `Could not update ExpireTime with given auth token`
        );
      }
    } catch (err) {
      // if (err.detail) {
      //   throw new DBError(err.detail);
      // }
      throw err;
    }
  };

  function validateData({ authToken }) {
    const schema = Joi.object().keys({
      authToken: Joi.string()
        .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
        .error(() => {
          return new Error("Invalid auth Token syntex");
        }),
    });

    const { value, error } = schema.validate({ authToken });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
