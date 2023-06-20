module.exports = function makeAddEmailFolderAssociation({
  Joi,
  emailFolderAssociationTemplet,
  emailFolderAssociationDB,
}) {
  return async function addEmailFolderAssociation({ messageId, labelId }) {
    validateData({ messageId, labelId });

    const emailFolderAssociationValue = emailFolderAssociationTemplet({
      messageId,
      labelId,
    });

    const messageIdValue = emailFolderAssociationValue.getMessageId();
    const labelIdValue = emailFolderAssociationValue.getLabelId();

    const emailFolderAssociationID =
      await emailFolderAssociationDB.addEmailFolderAssociation({
        messageId: messageIdValue,
        labelId: labelIdValue,
      });

    return emailFolderAssociationID;
  };
  function validateData({ messageId, labelId }) {
    const schema = Joi.object().keys({
      messageId: Joi.string().required(),
      labelId: Joi.string().required(),
    });

    const { value, error } = schema.validate({ messageId, labelId });
    if (error) {
      throw {
        error: "Validation Error",
        message: error.details[0].message,
      };
    }

    return;
  }
};
