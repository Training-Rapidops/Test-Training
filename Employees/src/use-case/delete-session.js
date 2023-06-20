module.exports = function makeDeleteSession({
  Joi,
  getEmployee,
  tokenDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function deleteSession({ tokenId, employeeId }) {
    try {
      const value = validateData({ tokenId, employeeId });

      ({ tokenId, employeeId } = value);

      const isEmployeeExists = await isEmployeeDataExists({ employeeId });

      if (isEmployeeExists) {
        const result = await tokenDB.deleteSessionDB({ tokenId, employeeId });

        const affectedRows = result.rowCount;
        if (affectedRows > 0) {
          if (affectedRows === tokenId.length) {
            return { affectedRows };
          } else {
            return {
              affectedRows,
              failedToDeleteCount: tokenId.length - affectedRows,
            };
          }
        } else {
          throw new NoDataFoundError(
            `token With Given Id:${tokenId} Already Doesnt exists`
          );
        }
      }
    } catch (err) {
      // if (err.hasOwnProperty("detail")) {
      //   throw new DBError(err.message);
      // }
      throw err;
    }
  };
  function validateData({ tokenId, employeeId }) {
    const schema = Joi.object().keys({
      tokenId: Joi.array().items(Joi.string().guid()).unique().required(),
      employeeId: Joi.string().guid().required(),
    });
    const { value, error } = schema.validate({ tokenId, employeeId });
    if (error) {
      throw new ValidationError(error.message);
    }

    return value;
  }

  async function isEmployeeDataExists({ employeeId }) {
    const result = await getEmployee({ id: employeeId });

    if (!result) {
      throw NoDataFoundError(`Employee With id ${employeeId} doesn't Exists`);
    }
    return true;
  }
};
