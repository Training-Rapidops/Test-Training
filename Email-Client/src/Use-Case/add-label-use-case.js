module.exports = function makeAddLabel({ Joi, labelDB, labelTemplet }) {
  return async function addLabelUsecase({ insertId, label }) {
    validateId({ insertId, label });

    const labelValues = labelTemplet({ id: insertId, label });
    const insertIdValue = labelValues.getId();
    const labelValue = labelValues.getLabel();

    const labelData = await labelDB.addLabelFolderDBCockroach({
      insertId: insertIdValue,
      label: labelValue,
    });

    return;
  };
  async function validateId({ insertId, label }) {
    const schema = Joi.object().keys({
      insertId: Joi.string().required(),
      label: Joi.string().min(3).required(),
    });

    const { value, error } = schema.validate({ insertId, label });
    if (error) {
      throw {
        error: "Validation Error",
        message: error.details[0].message,
      };
    }

    return;
  }
};
