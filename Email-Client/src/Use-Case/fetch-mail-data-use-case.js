module.exports = function makeFetchMailDataUsecase({ fetch, formatMail }) {
  return async function fetchMailData({ mail, userData }) {
    try {
      const data = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${mail.id}?access_token=${userData.access_token}`
      );
      let mailData = await data.json();

      let {
        textBody,
        htmlBody,
        labelIds,
        messageId,
        subject,
        snippet,
        userId,
        internetMessageId,
        threadId,
        InReplyTo,
        refrence,
        headers,
        attachments,
      } = await formatMail({ mailData, userData });

      return {
        textBody,
        htmlBody,
        labelIds,
        messageId,
        subject,
        snippet,
        userId,
        internetMessageId,
        threadId,
        InReplyTo,
        refrence,
        headers,
        attachments,
      };
    } catch (err) {
      console.log(mail.id, err, "7777777777777777777777777777");
    }
  };
};
