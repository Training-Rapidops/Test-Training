module.exports = function makeGetEmployeeAction({
  Joi,
  getEmployee,
  ValidationError,
}) {
  return async function getEmployeeAction(req, res) {
    try {
      const { id } = req.params;

      validateData({ id });

      const getEmployeeDetails = await getEmployee({ id });

      res.status(200).json({ status: "success", body: getEmployeeDetails });
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

  function validateData({ id }) {
    const schema = Joi.object().keys({
      id: Joi.string().guid().required(),
    });

    const { value, error } = schema.validate({ id });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
