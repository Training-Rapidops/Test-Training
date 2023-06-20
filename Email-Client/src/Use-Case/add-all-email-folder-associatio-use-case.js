module.exports = function makeAddAllEmailFolderAssociation({
  Joi,
  getLabelByName,
  addEmailFolderAssociation,
}) {
  return async function addAllEmailFolderAssociation({
    userId,
    messageId,
    labelIds,
  }) {
    validateData({
      userId,
      messageId,
    });

    labelIds.forEach(async (label) => {
      const labelData = await getLabelByName({
        labelName: label,
        userId,
      });

      const labelId = labelData[0].id;

      const emailFolderAssociationID = await addEmailFolderAssociation({
        messageId,
        labelId,
      });

      return emailFolderAssociationID;
    });
  };
  function validateData({ userId, messageId }) {
    const schema = Joi.object().keys({
      userId: Joi.string(),
      messageId: Joi.string(),
    });

    const { value, error } = schema.validate({
      userId,
      messageId,
    });

    if (error) {
      throw {
        error: "Validation Error",
        message: error.details[0].message,
      };
    }

    return;
  }
};
