module.exports = function makeGetLabelByName({ Joi, labelDB }) {
  return async function getLabelByName({ labelName, userId }) {
    validateData({ labelName, userId });

    const result = await labelDB.getLabelByNameCockroach({ labelName, userId });

    return result;
  };

  function validateData({ labelName, userId }) {
    const schema = Joi.object().keys({
      labelName: Joi.string().required(),
      userId: Joi.string().required(),
    });

    const { value, error } = schema.validate({ labelName, userId });
    if (error) {
      throw {
        error: "Validation Error",
        message: error.details[0].message,
      };
    }

    return;
  }
};
