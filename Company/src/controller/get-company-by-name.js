module.exports = function makeGetCompanyByNameAction({
  Joi,
  getCompanyByName,
  ValidationError,
}) {
  return async function getCompanyByNameAction(req, res) {
    try {
      const { name } = req.params;

      validateData({ name });

      const getCompanyByNameDetails = await getCompanyByName({ name });

      res
        .status(200)
        .json({ status: "success", body: getCompanyByNameDetails });
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

  function validateData({ name }) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).required(),
    });

    const { value, error } = schema.validate({ name });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
