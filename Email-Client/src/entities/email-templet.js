module.exports = function makeEmailTemplet({ Joi }) {
  return function emailTemplet({
    textBody,
    htmlBody,
    messageId,
    subject,
    snippet,
    userId,
    internetMessageId,
    threadId,
    InReplyTo,
    refrence,
  }) {
    const schema = Joi.object({
      textBody: Joi.string().allow(""),
      htmlBody: Joi.string().allow(""),
      messageId: Joi.string(),
      subject: Joi.string().allow(""),
      snippet: Joi.string().allow(""),
      userId: Joi.string(),
      internetMessageId: Joi.string(),
      threadId: Joi.string(),
      InReplyTo: Joi.string(),
      refrence: Joi.string(),
    });

    const { value, error } = schema.validate({
      textBody,
      htmlBody,
      messageId,
      subject,
      snippet,
      userId,
      internetMessageId,
      threadId,
      InReplyTo,
      refrence,
    });
    if (error)
      throw { error: "Validation Error", message: error.details[0].message };
    return Object.freeze({
      getTextBody: () => value.textBody,
      getHtmlBody: () => value.htmlBody,
      getMessageId: () => value.messageId,
      getSubject: () => value.subject,
      getSnipet: () => value.snippet,
      getUserId: () => value.userId,
      getInternetMessageId: () => value.internetMessageId,
      getThreadId: () => value.threadId,
      getInReplyTo: () => value.InReplyTo,
      getRefrence: () => value.refrence,
    });
  };
};
