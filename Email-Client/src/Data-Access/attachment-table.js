function attachmentDB({ mysql, cockroach }) {
  return { addAttchmentCockroach };
  //  message_id | attachment_id | file_name | file_path | file_type | file_size

  async function addAttchmentCockroach({
    messageId,
    attachmentId,
    fileName,
    fileType,
    filePath,
    fileSize,
  }) {
    const values = [
      messageId,
      attachmentId,
      fileName,
      fileType,
      filePath,
      fileSize,
    ];
    const result = await cockroach.query(
      "INSERT INTO attachment(message_id,attachment_id,file_name,file_type,file_path,file_size) VALUES($1,$2,$3,$4,$5,$6)",
      values
    );

    return result;
  }
}

module.exports = attachmentDB;
