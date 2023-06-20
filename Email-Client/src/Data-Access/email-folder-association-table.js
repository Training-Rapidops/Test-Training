module.exports = function emailFolderAssociationDB({ mysql, cockroach }) {
  return { addEmailFolderAssociation };

  async function addEmailFolderAssociation({ messageId, labelId }) {
    const values = [messageId, labelId];

    const result = await cockroach.query(
      "INSERT INTO email_folder_association(message_id,label_id) VALUES($1,$2) Returning id",
      values
    );

    const id = result.rows[0].id;

    return id;
  }
};
