module.exports = function makeTokenTemplete({ Joi, ValidationError }) {
  return function tokenTemplete({
    employeeId,
    jwtToken,
    expireTime,
    browser,
    device,
    ipAddress,
    location,
  }) {
    const schema = Joi.object().keys({
      employeeId: Joi.string().guid().trim(),
      jwtToken: Joi.string().trim(),
      expireTime: Joi.number().integer(),
      browser: Joi.string().lowercase().trim(),
      device: Joi.string().lowercase().trim(),
      ipAddress: Joi.string(),
      location: Joi.string().lowercase().trim(),
    });

    const { value, error } = schema.validate({
      employeeId,
      jwtToken,
      expireTime,
      browser,
      device,
      ipAddress,
      location,
    });

    if (error) {
      throw new ValidationError(error.message);
    }

    return {
      getEmployeeId: () => value.employeeId,
      getJwtToken: () => value.jwtToken,
      getExpireTime: () => value.expireTime,
      getBrowser: () => value.browser,
      getDevice: () => value.device,
      getIpAddress: () => value.ipAddress,
      getLocation: () => value.location,
    };
  };
};
