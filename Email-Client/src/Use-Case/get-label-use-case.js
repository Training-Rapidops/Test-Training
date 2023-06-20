module.exports = function makeGetLabel({ Joi, labelDB }) {
  return async function getlabel({ userId }) {
    await validateId({ userId });

    const label = await labelDB.getLabelByIdDBCockroach({ id: userId });
    // const labelData = [];
    // label.forEach((label) => {
    //   labelData.push(label.label_name);
    // });
    // return labelData;
    return label;
  };
  async function validateId({ userId }) {
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
