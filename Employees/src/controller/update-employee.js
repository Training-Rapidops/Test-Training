module.exports = function makeUpdateEmployeeAction({
  Joi,
  updateEmployee,
  ValidationError,
}) {
  return async function updateEmployeeAction(req, res) {
    try {
      const { id } = req.params;
      const { address, role } = req.body;

      validateData({ id, address, role });

      const updateEmployeeDetails = await updateEmployee({
        id,
        address,
        role,
      });

      res.status(200).json({ status: "success", body: updateEmployeeDetails });
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

  function validateData({ id, address, role }) {
    const schema = Joi.object()
      .keys({
        id: Joi.string().guid().required(),
        address: Joi.string().min(5),
        role: Joi.string().min(3),
      })
      .or("employeeAddress", "role");

    const { value, error } = schema.validate({
      id,
      address,
      role,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
