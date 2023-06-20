module.exports = function makeAddMailAction({ Joi, addMail }) {
  return async function addMailAction(req, res) {
    try {
      const {
        textBody,
        htmlBody,
        subject,
        snippet,
        userId,
        internetMessageId,
        threadId,
        InReplyTo,
        refrence,
      } = req.body;

      validateData({
        textBody,
        htmlBody,
        subject,
        snippet,
        userId,
        internetMessageId,
        threadId,
        InReplyTo,
        refrence,
      });

      addMailDetails = await addMail({
        textBody,
        htmlBody,
        subject,
        snippet,
        userId,
        internetMessageId,
        threadId,
        InReplyTo,
        refrence,
      });

      res.status(200).send(addMailDetails);
    } catch (err) {
      const error = err.message || err.detail;
      console.log(err);
      res.status(400).send(error);
    }
  };
  function validateData({
    textBody,
    htmlBody,
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
    return;
  }
};
