module.exports = function makeVarifyAuthToken({
  Joi,
  jwt,
  config,
  tokenDB,
  ValidationError,
  DBError,
  AuthorizationError,
}) {
  return async function varifyAuthToken({ authToken }) {
    try {
      const value = validateData({ authToken });
      ({ authToken } = value);
      var tokenData;

      try {
        tokenData = await jwt.verify(authToken, config.Oauth.secretkey);
      } catch (err) {
        throw new AuthorizationError(err.message);
      }

      const employeeId = tokenData.sub;

      const tokenTableData = await tokenDB.getTokenByEmpId({ employeeId });

      if (tokenTableData.length > 0) {
        const matchedData = tokenTableData.filter(
          (token) => token.jwt_token === authToken
        );

        if (matchedData[0].expire_time >= Date.now()) {
          return true;
        } else {
          throw new AuthorizationError(
            "Your Authorization credentials have expired, please login and try again"
          );
        }
      } else {
        throw new AuthorizationError(
          "You Are currently Not Authorized to access this data"
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
