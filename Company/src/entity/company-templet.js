module.exports = function makeCompanyTemplet({ Joi, ValidationError }) {
  return function companyTemplet({
    name,
    address,
    owner,
    contectNo,
    contectEmail,
  }) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3),
      address: Joi.string().min(5),
      owner: Joi.string().min(3),
      contectNo: Joi.number().integer(),
      contectEmail: Joi.string().email(),
    });

    const { value, error } = schema.validate({
      name,
      address,
      owner,
      contectNo,
      contectEmail,
    });

    if (error) {
      throw new ValidationError(error.message);
    }

    return {
      getName: () => value.name,
      getAddress: () => value.address,
      getOwner: () => value.owner,
      getContectNo: () => value.contectNo,
      getContectEmail: () => value.contectEmail,
    };
  };
};
