module.exports = function makeAdddRecipients({
  Joi,
  recipientsTemplet,
  recipientDB,
}) {
  return async function addRecipients({ from, to, cc, bcc, messageId }) {
    validateData({ from, to, cc, bcc, messageId });

    const recipientArray = getRecipientArray({ from, to, cc, bcc });
    let recipientId;

    recipientArray.forEach(async (recipient) => {
      const { type, emailAddress } = recipient;

      recipientValue = recipientsTemplet({ messageId, emailAddress, type });

      const messageIdValue = recipientValue.getMessageId();
      const emailAddressValue = recipientValue.getEmailAddress();
      const typeValue = recipientValue.getType();

      recipientId = await recipientDB.addRecipientsCockroach({
        messageId: messageIdValue,
        emailAddress: emailAddressValue,
        type: typeValue,
      });
    });
  };

  function validateData({ from, to, cc, bcc, messageId }) {
    const schema = Joi.object().keys({
      from: Joi.string(),
      to: Joi.string(),
      cc: Joi.string(),
      bcc: Joi.string(),
      messageId: Joi.string().required(),
    });

    const { value, error } = schema.validate({ from, to, cc, bcc, messageId });
    if (error) {
      throw { error: "validation error", message: error.detail[0].message };
    }
    return;
  }

  function getRecipientArray({ from, to, cc, bcc }) {
    const sendData = [];

    if (from) {
      let emailAddressData = getRecipientData({ data: from });

      sendData.push({ type: "from", emailAddress: emailAddressData });
    }
    if (to) {
      let emailAddressData = getRecipientData({ data: to });

      sendData.push({ type: "to", emailAddress: emailAddressData });
    }
    if (cc) {
      let emailAddressData = getRecipientData({ data: cc });

      sendData.push({ type: "cc", emailAddress: emailAddressData });
    }
    if (bcc) {
      let emailAddressData = getRecipientData({ data: bcc });

      sendData.push({ type: "bcc", emailAddress: emailAddressData });
    }

    return sendData;
  }

  function getRecipientData({ data }) {
    emailAddresses = [];
    let emaildata = data.split(", ");
    emaildata.forEach((email) => {
      if (email.indexOf("<") !== -1) {
        emailAddresses.push(
          email.slice(email.indexOf("<") + 1, email.indexOf(">"))
        );
      } else {
        emailAddresses.push(email);
      }
    });
    const emailAddressData = emailAddresses.join(", ");

    return emailAddressData;
  }
};
