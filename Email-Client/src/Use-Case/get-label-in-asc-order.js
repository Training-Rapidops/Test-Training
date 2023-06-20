module.exports = function makeGetLabelInAscOrder({ Joi, labelDB }) {
  return async function getLabelInAscOrder({ userId }) {
    validateData({ userId });

    const label = await labelDB.getLabelInAscOrder({ id: userId });
    const labelData = [];
    label.forEach((label) => {
      labelData.push(label.label_name);
    });
    return labelData;
  };

  async function validateData({ userId }) {
    const schema = Joi.object().keys({
      userId: Joi.string().required(),
    });

    const { value, error } = schema.validate({ userId });
    if (error) {
      throw {
        error: "Validation Error",
        message: error.details[0].message,
      };
    }

    return;
  }
};
