module.exports = function makeDeleteSessionAction({
  Joi,
  deleteSession,
  ValidationError,
}) {
  return async function deleteSessionAction(req, res) {
    try {
      const { employeeId } = req.params;
      const { tokenId } = req.body;

      validateData({ tokenId, employeeId });

      const deleteSessionDetails = await deleteSession({ tokenId, employeeId });

      res.status(200).send({ status: "success", body: deleteSessionDetails });
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

  function validateData({ tokenId, employeeId }) {
    const schema = Joi.object().keys({
      tokenId: Joi.array().items(Joi.string().guid()).unique().required(),
      employeeId: Joi.string().guid().required(),
    });
    const { value, error } = schema.validate({ tokenId, employeeId });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
