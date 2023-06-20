module.exports = function recipientDB({ mysql, cockroach }) {
  return {
    addRecipientsCockroach,
  };
  async function addRecipientsCockroach({ messageId, emailAddress, type }) {
    const values = [messageId, emailAddress, type];
    const result = await cockroach.query(
      "INSERT INTO recipient(message_id,email_address,type) VALUES($1,$2,$3) Returning id",
      values
    );

    const id = result.rows[0].id;

    return result.rows[0].id;
  }
};
