module.exports = function makeAddPermissionsAction({
  Joi,
  addPermission,
  ValidationError,
}) {
  return async function addPermissionsAction(req, res) {
    try {
      const authToken = req.headers.authorization
        ? req.headers.authorization.split("Bearer ")[1]
        : undefined;
      const { employeeId, role, permission, isMaster } = req.body;

      validateData({
        authToken,
        employeeId,
        role,
        permission,
        isMaster,
      });

      const response = await addPermission({
        authToken,
        employeeId,
        role,
        permission,
        isMaster,
      });

      res.status(201).json({ status: "success", body: response });
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

  function validateData({ authToken, employeeId, role, permission, isMaster }) {
    const schema = Joi.object().keys({
      authToken: Joi.string().required(),
      employeeId: Joi.string().guid().required(),
      role: Joi.string().min(3).required(),
      permission: Joi.array().items().min(1).required(),
      isMaster: Joi.string(),
    });

    const { value, error } = schema.validate({
      authToken,
      employeeId,
      role,
      permission,
      isMaster,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
