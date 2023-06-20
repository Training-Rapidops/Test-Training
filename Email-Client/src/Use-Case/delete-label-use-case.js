module.exports = function makeDeleteLabel({ Joi, userDB, labelDB }) {
  return async function deleteLabelUseCase({ id, label }) {
    validateData({ id, label });

    await checkExistingUser({ id });

    const result = await labelDB.deleteLabelDBCockroach({ id, label });

    const affectedRows =
      result.rowCount == undefined ? result.affectedRows : result.rowCount;

    if (affectedRows === 0) {
      throw {
        error: "Forbidden Error",
        message: "Label already does not exists",
      };
    }
    return affectedRows;
  };
  function validateData({ id, label }) {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      label: Joi.string().min(3).required(),
    });

    const { value, error } = schema.validate({ id, label });
    if (error) {
      throw {
        error: "Validation error",
        message: error.details[0].message,
      };
    }

    return;
  }
  async function checkExistingUser({ id }) {
    const result = await userDB.getUserByIdDBCockroach({ id });
    if (result.length === 0) {
      throw { error: "Forbidden Error", message: "User does not exists" };
    }

    return;
  }
};
