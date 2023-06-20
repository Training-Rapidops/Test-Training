module.exports = function makeAttachmentTemplet({ Joi }) {
  return function attachmentTemplet({
    messageId,
    attachmentId,
    fileName,
    fileType,
    filePath,
    fileSize,
  }) {
    const schema = Joi.object().keys({
      messageId: Joi.string(),
      attachmentId: Joi.string(),
      fileName: Joi.string(),
      fileType: Joi.string(),
      filePath: Joi.string(),
      fileSize: Joi.number().integer(),
    });

    const { value, error } = schema.validate({
      messageId,
      attachmentId,
      fileName,
      fileType,
      filePath,
      fileSize,
    });

    if (error)
      throw { error: "Validation error", message: error.detail[0].message };

    return {
      getMessageId: () => value.messageId,
      getAttachmentId: () => value.attachmentId,
      getFileName: () => value.fileName,
      getFileType: () => value.fileType,
      getFilePath: () => value.filePath,
      geyFileSize: () => value.fileSize,
    };
  };
};
