module.exports = function makeGetAllCompanyAction({
  Joi,
  getAllCompany,
  ValidationError,
}) {
  return async function getAllCompanyAction(req, res) {
    try {
      const { limit, offset } = req.query;

      validateData({ limit, offset });

      const getAllCompanyDetails = await getAllCompany({ limit, offset });

      res.status(200).json({ status: "success", body: getAllCompanyDetails });
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

  function validateData({ limit, offset }) {
    const schema = Joi.object().keys({
      limit: Joi.number().integer().min(1).required(),
      offset: Joi.number().integer(),
    });

    const { value, error } = schema.validate({ limit, offset });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
