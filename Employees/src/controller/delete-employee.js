module.exports = function makeDeleteEmployeeAction({
  Joi,
  deleteEmployee,
  ValidationError,
}) {
  return async function deleteEmployeeAction(req, res) {
    try {
      const { id } = req.params;

      validateData({ id });

      const deleteEmployeeDetails = await deleteEmployee({ id });

      res.status(204).json({ status: "success", body: deleteEmployeeDetails });
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
