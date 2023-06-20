module.exports = function makeAddMailUseCase({
  Joi,
  emailDB,
  userDB,
  emailTemplet,
}) {
  return async function addMailUseCase({
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
    validateData({
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

    await checkExistingMail({ userId });

    const emailValues = emailTemplet({
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

    const textBodyValue = emailValues.getTextBody(),
      htmlBodyValue = emailValues.getHtmlBody(),
      messageIdValue = emailValues.getMessageId(),
      subjectValue = emailValues.getSubject(),
      snippetValue = emailValues.getSnipet(),
      userIdValue = emailValues.getUserId(),
      internetMessageIdValue = emailValues.getInternetMessageId(),
      threadIdValue = emailValues.getThreadId(),
      InReplyToValue = emailValues.getInReplyTo(),
      refrenceValue = emailValues.getRefrence();

    const result = await emailDB.addMailDBCockroach({
      textBody: textBodyValue,
      htmlBody: htmlBodyValue,
      messageId: messageIdValue,
      subject: subjectValue,
      snippet: snippetValue,
      userId: userIdValue,
      internetMessageId: internetMessageIdValue,
      threadId: threadIdValue,
      InReplyTo: InReplyToValue,
      refrence: refrenceValue,
    });

    // const affectedRows = result.affectedRows || result.rowCount;

    id = result.rows[0].id;
    return id;
  };
  function validateData({
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
      messageId: Joi.string().required(),
      subject: Joi.string().allow(""),
      snippet: Joi.string().allow(""),
      userId: Joi.string(),
      internetMessageId: Joi.string().required(),
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
      return { error: "Validation Error", message: error.details[0].message };
    return;
  }
  async function checkExistingMail({ userId }) {
    const result = await userDB.getUserByIdDBCockroach({ userId });
    if ((result.length = 0)) {
      throw { error: "forbidden Error", message: "User Does not Exists" };
    }

    return;
  }
};
