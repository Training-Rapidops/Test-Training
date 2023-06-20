module.exports = function makeSendMailAction({
  Joi,
  sendMailUsingNodeMailer,
  sendMailUsingFetch,
}) {
  return async function sendMailAction(req, res) {
    try {
      const { to, cc, bcc, subject, textBody, htmlBody, attachmentPaths } =
        req.body;
      const { id } = req.params;
      validateData({
        id,
        to,
        cc,
        bcc,
        subject,
        textBody,
        htmlBody,
        attachmentPaths,
      });

      const sendmailDetails = await sendMailUsingNodeMailer({
        id,
        to,
        cc,
        bcc,
        subject,
        textBody,
        htmlBody,
        attachmentPaths,
      });

      // const sendmailDetails = await sendMailUsingFetch({
      //   id,
      //   to,
      //   cc,
      //   bcc,
      //   subject,
      //   textBody,
      //   htmlBody,
      //   attachmentPaths,
      // });

      console.log(sendmailDetails, "????????????");

      res.status(201).send(sendmailDetails);
    } catch (err) {
      console.log(err);
      const error = err.message || err.detail;
      res.status(404).send(error);
    }
  };

  function validateData({
    id,
    to,
    cc,
    bcc,
    subject,
    textBody,
    htmlBody,
    attachmentPaths,
  }) {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      to: Joi.string().email().required(),
      subject: Joi.string().allow(""),
      textBody: Joi.string().allow(""),
      htmlBody: Joi.string().optional(),
      cc: Joi.string().optional(),
      bcc: Joi.string().optional(),
      attachmentPaths: Joi.string().optional(),
    });

    const { value, error } = schema.validate({
      id,
      to,
      cc,
      bcc,
      subject,
      textBody,
      htmlBody,
      attachmentPaths,
    });
    if (error) {
      throw { error: "Validation Error", message: error.detail[0].message };
    }

    return;
  }
};

// from: emailFeilds.from,
// to: emailFeilds.to,
// cc: emailFeilds.cc,
// bcc: emailFeilds.bcc,
// replyTo: emailFeilds.replyTo,
// inReplyTo: emailFeilds.inReplyTo,
// subject: emailFeilds.subject,
// text: emailFeilds.text,
// html: emailFeilds.html,
// attachments: emailFeilds.attachments,
// references: emailFeilds.references,
