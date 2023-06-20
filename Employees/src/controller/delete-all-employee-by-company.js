module.exports = function makeDeleteEmployeesByCompanyAction({
  Joi,
  deleteEmployeesByCompany,
  ValidationError,
}) {
  return async function deleteEmployeesByCompanyAction(req, res) {
    try {
      const { companyId } = req.params;

      validateData({ companyId });

      const deleteEmployeesByCompanyDetails = await deleteEmployeesByCompany({
        companyId,
      });

      res
        .status(204)
        .json({ status: "success", body: deleteEmployeesByCompanyDetails });
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

  function validateData({ companyId }) {
    const schema = Joi.object().keys({
      companyId: Joi.string().guid().required(),
    });

    const { value, error } = schema.validate({ companyId });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
