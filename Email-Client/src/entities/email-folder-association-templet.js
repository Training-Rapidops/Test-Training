module.exports = function makeEmailFolderAssociationTemplet({ Joi }) {
  return function emailFolderAssociationTemplet({ messageId, labelId }) {
    const schema = Joi.object().keys({
      messageId: Joi.string(),
      labelId: Joi.string(),
    });

    const { value, error } = schema.validate({ messageId, labelId });
    if (error) {
      throw { error: "Validation Error", message: error.detail[0].message };
    }

    return {
      getMessageId: () => value.messageId,
      getLabelId: () => value.labelId,
    };
  };
};
