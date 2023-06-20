module.exports = function makeCompanyTemplet({ Joi, ValidationError }) {
  return function companyTemplet({
    name,
    email,
    password,
    address,
    companyId,
    role,
    profilePhoto,
  }) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3),
      email: Joi.string().email(),
      password: Joi.string(),
      address: Joi.string().min(5),
      companyId: Joi.string(),
      role: Joi.string().min(3),
      profilePhoto: Joi.string(),
    });

    const { value, error } = schema.validate({
      name,
      email,
      password,
      address,
      companyId,
      role,
      profilePhoto,
    });

    if (error) {
      throw new ValidationError(error.message);
    }

    return {
      getName: () => value.name,
      getEmail: () => value.email,
      getPassword: () => value.password,
      getAddress: () => value.address,
      getCompanyId: () => value.companyId,
      getRole: () => value.role,
      getProfilePhoto: () => value.profilePhoto,
    };
  };
};
