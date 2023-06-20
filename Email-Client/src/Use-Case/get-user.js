module.exports = function getUser({ Joi, userDB, getLabel }) {
  return async function userDetailUseCase({ email }) {
    await validateMail({ email });

    await checkExistingMail({ email });

    const result = await userDB.getUserDBCockroach({ email });

    for (let i = 0; i < result.length; i++) {
      const userId = result[i].id;
      const label = await getLabel({ userId });
      const labelData = [];
      label.forEach((label) => {
        labelData.push(label.label_name);
      });

      result[i].labels = labelData;
    }
    return result;
  };
  async function validateMail({ email }) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });
    const { value, error } = schema.validate({ email });

    if (error) {
      throw {
        err: "Validation Error",
        message: error.details[0].message,
      };
    }

    return;
  }
  async function checkExistingMail({ email }) {
    const result = await userDB.getUserDBCockroach({ email });

    // if (result.length === 0) {
    //   throw { error: "Forbidden Error", message: "User Doesn't Exists" };
    // }
    if (result.length === 0) {
      throw { error: "Forbidden Error", message: "User Doesn't Exists" };
    }

    return;
  }
};
