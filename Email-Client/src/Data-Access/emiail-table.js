function emailDB({ mysql, cockroach }) {
  return {
    addMailDBCockroach,
  };
  async function addMailDBCockroach({
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
  }) {
    let values = [
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
    ];

    const result = await cockroach.query(
      "INSERT INTO message(text_body,html_body,message_id,subject,snippet,user_id,internet_message_id,thread_id,in_reply_to,refrence) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id",
      values
    );
    console.log(
      "added mails ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;"
    );

    return result;
  }
}

module.exports = emailDB;
