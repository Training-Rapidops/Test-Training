module.exports = function makeRecipientTemplet({ Joi }) {
  return function recipientsTemplet({ messageId, emailAddress, type }) {
    const schema = Joi.object().keys({
      messageId: Joi.string(),
      emailAddress: Joi.string().min(3),
      type: Joi.string().min(2).max(20),
    });

    const { value, error } = schema.validate({ messageId, emailAddress, type });
    if (error) {
      throw { error: "validation error", message: error.detail[0].message };
    }

    return {
      getMessageId: () => value.messageId,
      getEmailAddress: () => value.emailAddress,
      getType: () => value.type,
    };
  };
};
