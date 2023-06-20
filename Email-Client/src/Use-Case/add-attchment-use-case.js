module.exports = function makeAddAttachmentUseCase({
  Joi,
  fs,
  fetch,
  attachmentDB,
  attachmentTemplet,
}) {
  return async function addAttachment({
    messageId,
    attachmentId,
    fileName,
    fileType,
    fileSize,
    accessToken,
    email,
    mailId,
  }) {
    validateData({
      messageId,
      attachmentId,
      fileName,
      fileType,
      fileSize,
      accessToken,
      email,
      mailId,
    });

    const filePath = await addToFilePath({
      email,
      mailId,
      fileName,
      attachmentId,
      accessToken,
    });

    const attachmentValues = attachmentTemplet({
      messageId,
      attachmentId,
      fileName,
      fileType,
      filePath,
      fileSize,
    });

    const messageIdValue = attachmentValues.getMessageId(),
      attachmentIdValue = attachmentValues.getAttachmentId(),
      fileNameValue = attachmentValues.getFileName(),
      fileTypeValue = attachmentValues.getFileType(),
      filePathValue = attachmentValues.getFilePath(),
      fileSizeValue = attachmentValues.geyFileSize();

    const addedAttachmentId = await attachmentDB.addAttchmentCockroach({
      messageId: messageIdValue,
      attachmentId: attachmentIdValue,
      fileName: fileNameValue,
      fileType: fileTypeValue,
      filePath: filePathValue,
      fileSize: fileSizeValue,
    });
  };

  function validateData({
    messageId,
    attachmentId,
    fileName,
    fileType,
    fileSize,
    accessToken,
    email,
    mailId,
  }) {
    const schema = Joi.object().keys({
      messageId: Joi.string().required(),
      attachmentId: Joi.string(),
      fileName: Joi.string(),
      fileType: Joi.string(),
      fileSize: Joi.number().integer(),
      accessToken: Joi.string().required(),
      email: Joi.string().required(),
      mailId: Joi.string().required(),
    });
    const { value, error } = schema.validate({
      messageId,
      attachmentId,
      fileName,
      fileType,
      fileSize,
      accessToken,
      email,
      mailId,
    });

    if (error)
      throw { error: "Validation error", message: error.detail[0].message };
    return;
  }

  async function addToFilePath({
    email,
    mailId,
    fileName,
    attachmentId,
    accessToken,
  }) {
    const filePath =
      "/home/ad.rapidops.com/safi.shaikh/Desktop/Safi-Shaikh/Email-Client/src/attachment-file/" +
      fileName;

    const data = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${email}/messages/${mailId}/attachments/${attachmentId}?access_token=${accessToken}`
    );
    const response = await data.json();
    const attachmentData = response.data.replace(/-/g, "+").replace(/_/g, "/");

    const attachmentFile = Buffer.from(attachmentData, "base64").toString(
      "binary"
    );

    fs.writeFileSync(filePath, attachmentFile, "binary");
  }
};
