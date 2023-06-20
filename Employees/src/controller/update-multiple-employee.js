module.exports = function makeUpdateMultipleEmployeesAction({
  Joi,
  updateMultipleEmployees,
  ValidationError,
}) {
  return async function updateMultipleEmployeesAction(req, res) {
    try {
      let { updateData } = req.body;

      const updateMultipleEmployeesDetails = await updateMultipleEmployees({
        updateData,
      });

      res
        .status(200)
        .json({ status: "success", body: updateMultipleEmployeesDetails });
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
