module.exports = function makeAddToken({
  Joi,
  jwt,
  config,
  getLocationFromIp,
  tokenTemplete,
  tokenDB,
  ValidationError,
  DBError,
}) {
  return async function addToken({
    employeeId,
    browser,
    device,
    ipAddress,
    expireTime,
  }) {
    try {
      const value = validateData({
        employeeId,
        browser,
        device,
        ipAddress,
        expireTime,
      });
      ({ employeeId, browser, device, ipAddress, expireTime } = value);

      const { location } = await getLocationFromIp({ ipAddress });

      const payload = { sub: employeeId, iat: Date.now() };

      const secretKey = config.Oauth.secretkey;
      const jwtToken = jwt.sign(payload, secretKey);

      const tokenValues = tokenTemplete({
        employeeId,
        jwtToken,
        expireTime,
        browser,
        device,
        ipAddress,
        location,
      });

      const employeeIdValue = tokenValues.getEmployeeId(),
        jwtTokenValue = tokenValues.getJwtToken(),
        expireTimeValue = tokenValues.getExpireTime(),
        browserValue = tokenValues.getBrowser(),
        deviceValue = tokenValues.getDevice(),
        ipAddressValue = tokenValues.getIpAddress(),
        locationValue = tokenValues.getLocation();

      const result = await tokenDB.addTokenDB({
        employeeId: employeeIdValue,
        jwtToken: jwtTokenValue,
        expireTime: expireTimeValue,
        browser: browserValue,
        device: deviceValue,
        ipAddress: ipAddressValue,
        location: locationValue,
      });
      const id = result.rows[0].id;
      const token = result.rows[0].jwt_token;

      return { id, token };
    } catch (err) {
      // // if (err.hasOwnProperty("detail")) {
      // //   throw new DBError(err.detail);
      // }
      throw err;
    }
  };

  function validateData({
    employeeId,
    browser,
    device,
    ipAddress,
    expireTime,
  }) {
    const schema = Joi.object().keys({
      employeeId: Joi.string().guid().required(),
      browser: Joi.string().min(3).required(),
      device: Joi.string().min(3).required(),
      ipAddress: Joi.string()
        .ip({
          version: ["ipv4", "ipv6"],
          cidr: "optional",
        })
        .required(),
      expireTime: Joi.number().integer().required(),
    });

    const { value, error } = schema.validate({
      employeeId,
      browser,
      device,
      ipAddress,
      expireTime,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
