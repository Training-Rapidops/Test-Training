module.exports = function makeVarifyEmployeeAction({
  Joi,
  varifyEmployee,
  fetch,
  ValidationError,
}) {
  return async function varifyEmployeeAction(req, res) {
    try {
      const { email } = req.params;

      const varifyEmployeeDetails = await varifyEmployee({ email });

      res.status(200).json({ status: "success", body: varifyEmployeeDetails });
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
};
