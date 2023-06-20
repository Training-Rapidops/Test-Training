module.exports = function makeAddMailsConsumerUsecase({
  kafka,
  getLabelInAscOrder,
  fetchMails,
  fetchMailData,
  addMail,
  addAttachment,
  addRecipients,
  addAllEmailFolderAssociation,
}) {
  return async function addMailsConsumerUsecase({ userData }) {
    const labelsInOrder = await getLabelInAscOrder({ userId: userData.id });

    if (labelsInOrder.length > 0) {
      const { messages } = await fetchMails({
        userData,
        labelName: labelsInOrder[0],
      });

      if (messages) {
        for (mail of messages) {
          try {
            const {
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
            } = await fetchMailData({
              mail,
              userData,
            });

            const addedMailId = await addMail({
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

            if (attachments) {
              await addAllAttachments({
                attachments,
                userData,
                mail,
                addedMailId,
              });
            }

            await addRecipientsCall({ headers, addedMailId });
            await addEmailFolderAssociationCall({
              userId: userData.id,
              addedMailId,
              labelIds,
            });

            await callProducer({ userData });
          } catch (err) {
            console.log(mail.id, ":", err, "------------------------------");
          }
        }
      }
    } else {
      console.log("fetched All mails");
    }
  };

  async function addAllAttachments({
    attachments,
    userData,
    mail,
    addedMailId,
  }) {
    attachments.forEach(async (attachment) => {
      const addAttachmentDetails = await addAttachment({
        messageId: addedMailId,
        attachmentId: attachment.attachmentId,
        fileName: attachment.filename,
        fileType: attachment.mimeType,
        fileSize: attachment.size,
        accessToken: userData.access_token,
        email: userData.email,
        mailId: mail.id,
      });
    });
  }

  async function addRecipientsCall({ headers, addedMailId }) {
    const { from, to, bcc, cc } = headers;

    const addedRecipientId = await addRecipients({
      from,
      to,
      bcc,
      cc,
      messageId: addedMailId,
    });
  }

  async function addEmailFolderAssociationCall({
    userId,
    addedMailId,
    labelIds,
  }) {
    await addAllEmailFolderAssociation({
      userId,
      messageId: addedMailId,
      labelIds,
    });
  }

  async function callProducer({ userData }) {
    const { id, name, email, picturePath, access_token, refresh_token } =
      userData;
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: "addMails",
      messages: [
        {
          value: JSON.stringify({ userData }),
        },
      ],
    });
    await producer.disconnect();
  }
};
