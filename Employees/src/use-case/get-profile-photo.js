module.exports = function makeGetProfilePhoto({
  Joi,
  employeeDB,
  ValidationError,
  NoDataFoundError,
}) {
  return async function getProfilePhoto({ id }) {
    const value = validateData({ id });
    ({ id } = value);

    const [data] = await employeeDB.getEmployeeDB({ id });

    if (!data) {
      throw new NoDataFoundError("NO Employee Data Found for id " + id);
    }
    return { profilePhoto: data.profile_photo };
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
