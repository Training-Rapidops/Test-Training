module.exports = function makeGetUserById({ Joi, userDB, getLabel }) {
  return async function getUserById({ id }) {
    validateData({ id });

    const result = await userDB.getUserByIdDBCockroach({ id });

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

  function validateData({ id }) {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
    });

    const { value, error } = schema.validate({ id });

    if (error) {
      throw { error: "validation error", message: error.detail[0].message };
    }
    return;
  }
};
