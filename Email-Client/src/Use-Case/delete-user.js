module.exports = function deleteUserDetails({ Joi, userDB }) {
  return async function deleteUser({ email }) {
    try {
      validateMail({ email });

      await checkExistingMail({ email });

      const result = await userDB.deleteUserDBCockroach({ email });

      affectedRows =
        result.rowCount == undefined ? result.affectedRows : result.rowCount;
      return affectedRows;
    } catch (err) {
      throw err;
    }
    // dsjgcyudgcigcyqgcyu
  };
  function validateMail({ email }) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });
    const { value, error } = schema.validate({ email: email });
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

    if (result.length === 0) {
      throw {
        error: "forbidden Error",
        message: "User Already Does not exists",
      };
    }

    return;
  }
};
