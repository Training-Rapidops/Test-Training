module.exports = function makeUpdateLabelAction({ Joi, updateLabel }) {
  return async function updateLabelAction(req, res) {
    try {
      const { id, label } = req.params;
      const { newLabel } = req.body;
      validateData({ id, label, newLabel });

      const updateDetails = await updateLabel({ id, label, newLabel });

      res.status(200).send(`${updateDetails} Label Name updated Successfilly`);
    } catch (err) {
      const error = err.message || err.detail;
      console.log(err);
      res.status(400).send(error);
    }
  };
  function validateData({ id, label, newLabel }) {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      label: Joi.string().min(3).required(),
      newLabel: Joi.string().min(3).required(),
    });

    const result = schema.validate({ id, label, newLabel });
    if (result.error) {
      throw {
        error: "Validation Error",
        message: result.error.details[0].message,
      };
    }
  }
};
