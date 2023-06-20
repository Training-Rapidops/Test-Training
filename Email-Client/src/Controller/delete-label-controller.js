module.exports = function makeDeleteLableAction({ Joi, deleteLabel }) {
  return async function deleteLabelAction(req, res) {
    try {
      const { id, label } = req.params;

      validateData({ id, label });

      const deleteLabelDetails = await deleteLabel({ id, label });

      res
        .status(200)
        .send(
          `${deleteLabelDetails} Label Named ${label} Deleted Successfully`
        );
    } catch (err) {
      const error = err.message || err.detail;
      console.log(err);
      res.status(400).send(error);
    }
  };
  function validateData({ id, label }) {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      label: Joi.string().min(3).required(),
    });

    const result = schema.validate({ id, label });
    if (result.error) {
      throw {
        error: "Validation error",
        message: result.error.details[0].message,
      };
    }

    return;
  }
};
