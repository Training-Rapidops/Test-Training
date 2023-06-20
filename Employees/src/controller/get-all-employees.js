module.exports = function getAllEmployeesAction({
  Joi,
  getAllEmployees,
  ValidationError,
}) {
  return async function getAllEmployeesAction(req, res) {
    try {
      const { limit, offset } = req.query;
      const authToken = req.headers.authorization.split("Bearer ")[1];

      validateData({ limit, offset, authToken });

      const getAllEmployeesDetails = await getAllEmployees({
        limit,
        offset,
        authToken,
      });

      res.status(200).json({ status: "success", body: getAllEmployeesDetails });
    } catch (err) {
      console.log(err);
      res.status(err.httpStatusCode || 500).json({
        status: "error",
        name: err.name,
        message: err.message,
        date: err.date,
      });
    }
  };

  function validateData({ limit, offset, authToken }) {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().required(),
      offset: Joi.number().integer(),
      authToken: Joi.string().required(),
    });

    const { value, error } = schema.validate({ limit, offset, authToken });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
