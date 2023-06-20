module.exports = function makeGetLocationFromIp({
  Joi,
  geoip,
  ValidationError,
}) {
  return async function getLocationFromIp({ ipAddress }) {
    const value = validateData({ ipAddress });
    ({ ipAddress } = value);

    const geo = geoip.lookup(ipAddress);

    const location = `${geo.city}, ${geo.country}, ${geo.region}`;

    return { location };
  };

  function validateData({ ipAddress }) {
    const schema = Joi.object().keys({
      ipAddress: Joi.string()
        .ip({
          version: ["ipv4", "ipv6"],
          cidr: "optional",
        })
        .required(),
    });

    const { value, error } = schema.validate({
      ipAddress,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
