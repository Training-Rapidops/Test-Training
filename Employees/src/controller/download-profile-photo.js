module.exports = function makeDownloadProfilePhotoAction({
  Joi,
  downloadProfilePhoto,
  ValidationError,
}) {
  return async function downloadProfilePhotoAction(req, res) {
    try {
      const { id } = req.params;

      validateData({ id });

      const responce = await downloadProfilePhoto({ id });

      res.status(200).json({ status: "success", body: responce });
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

  function validateData({ id }) {
    const schema = Joi.object().keys({
      id: Joi.string().guid().required(),
    });

    const { value, error } = schema.validate({ id });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
