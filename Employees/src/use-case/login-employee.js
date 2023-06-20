module.exports = function makeLoginEmployee({
  Joi,
  bcrypt,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
  AuthenticationError,
  AuthorizationError,
}) {
  return async function loginEmployee({ email, password }) {
    try {
      const value = validateData({ email, password });
      ({ email, password } = value);

      const rows = await employeeDB.getEmployeeByEmailDB({ email });
      const result = rows[0];

      if (result) {
        const isPasswordCorrect = await bcrypt.compare(
          password,
          result.employee_password
        );

        if (isPasswordCorrect) {
          if (result.is_varified) {
            // const addedTokenDetails = await addToken({
            //   employeeId: result.id,
            // });

            // return addedTokenDetails;

            return { employeeId: result.id };
          } else {
            throw new AuthorizationError(`User Not Authorized`);
          }
        } else {
          throw new AuthenticationError(`Password Invalid`);
        }
      } else {
        throw new NoDataFoundError(`Employee With Email ${email} not found`);
      }
    } catch (err) {
      // if (err.detail) {
      //   throw new DBError(err.hasOwnProperty("detail"));
      // }
      throw err;
    }
  };

  function validateData({ email, password }) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(8)
        .max(20)
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
        .error((err) => {
          return new ValidationError(
            '"password" must contain one uppercase and one lowercase letter and a number and also length must be between 8 to 20 letters'
          );
        })
        .required(),
    });

    const { value, error } = schema.validate({
      email,
      password,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
