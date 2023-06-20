module.exports = function makeGetAllEmployeeByCompanyAction({
  Joi,
  getAllEmployeeByCompany,
  ValidationError,
}) {
  return async function getAllEmployeeByCompanyAction(req, res) {
    try {
      const { companyId } = req.params;
      const { limit, offset } = req.query;
      validateData({ limit, offset, companyId });

      const getAllEmployeeByCompanyDetails = await getAllEmployeeByCompany({
        limit,
        offset,
        companyId,
      });

      res
        .status(200)
        .json({ status: "success", body: getAllEmployeeByCompanyDetails });
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

  function validateData({ limit, offset, companyId }) {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().min(1).required(),
      offset: Joi.number().integer(),
      companyId: Joi.string().guid().required(),
    });

    const { value, error } = schema.validate({ limit, offset, companyId });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
