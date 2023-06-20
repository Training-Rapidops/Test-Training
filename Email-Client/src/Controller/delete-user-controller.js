module.exports = function makeDeleteUserAction({ Joi, deleteDetailsUseCase }) {
  return async function deleteUserdataAction(req, res) {
    try {
      const { email } = req.params;
      validateMail({ email });

      const deleteDetails = await deleteDetailsUseCase({ email });
      const response =
        deleteDetails.message || `${deleteDetails} User Deleted Successfully`;

      res.status(200).send(response);
    } catch (err) {
      const error = err.message || err.detail;
      console.log(err);
      res.status(403).send(error);
    }
  };
  function validateMail({ email }) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });

    const result = schema.validate({ email });
    if (result.error) {
      throw {
        error: "Validation Error  ",
        message: result.error.details[0].message,
      };
    }

    return;
  }
};
