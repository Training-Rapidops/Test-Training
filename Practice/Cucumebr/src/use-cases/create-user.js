module.exports = function makeCreateUser({
  Joi,
  usersDb,
  encryptPassword,
  ValidationError,
  ForbiddenError,
}) {
  return async function createUser({
    name,
    email,
    mobile,
    password,
  }) {
    validateInput({name, email, mobile, password});

    const userDetailsByEmail = await usersDb.getUsersDetailByEmail({
      attributes: ['id'],
      email,
    });
     console.log(userDetailsByEmail);
    if (userDetailsByEmail) {
      throw new ForbiddenError('User with the same email is already exists');
    }

    const userDetailsByMobile = await usersDb.getUsersDetailByMobile({
      attributes: ['id'],
      mobile,
    });
    if (userDetailsByMobile) {
      throw new ForbiddenError('User with the same mobile number is already exists');
    }

    const encryptedPassword = await encryptPassword({password});

    return await usersDb.createUser({
      name,
      email,
      mobile,
      password: encryptedPassword,
    });
  };

  function validateInput({name, email, mobile, password}) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      mobile: Joi.string().required(),
      password: Joi.string().min(8).required(),
    });

    const {error} = schema.validate({name, email, mobile, password});
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
