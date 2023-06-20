module.exports = function makeAddLabelByNameAction({ Joi, addLabelByName }) {
  return async function addLabelByNameAction(req, res) {
    try {
      const { id } = req.params;
      const { label, syncedFolderId, priority } = req.body;
      validateData({ id, label, syncedFolderId, priority });

      addLabelDetails = await addLabelByName({
        id,
        label,
        syncedFolderId,
        priority,
      });

      res.status(200).send(`${addLabelDetails} Label Added Successfully`);
    } catch (err) {
      const error = err.message || err.detail;
      console.log(err);
      res.status(400).send(error);
    }
  };
  function validateData({ id, label, syncedFolderId, priority }) {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      label: Joi.string().min(3).required(),
      syncedFolderId: Joi.string().required(),
      priority: Joi.number().integer().required(),
    });

    const result = schema.validate({ id, label, syncedFolderId, priority });
    if (result.error) {
      throw {
        error: "Validation error",
        message: result.error.details[0].message,
      };
    }

    return;
  }
};
