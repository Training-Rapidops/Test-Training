module.exports = function makeGetUserAction({ Joi, userDetailUseCase }) {
  return async function getUserDataAction(req, res) {
    try {
      const email = req.params.email;
      await validateMail({ email });

      const usreDetails = await userDetailUseCase({ email });
      const response = usreDetails;

      res.status(200).send(response);
    } catch (err) {
      const error = err.message || err.detail;
      console.log(err);
      res.status(403).send(error);
    }
  };
  async function validateMail({ email }) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });
    const result = schema.validate({ email });
    if (result.error) {
      return "Entered User mail Must Be valid";
    }
    return;
  }
};
