async function get() {
  const fetch = require("node-fetch");
  // const userData = await getUserData({ id });
  const userMail = "safi.shaikh360@gmail.com";
  const accessToken =
    "ya29.a0AWY7CkmIuXvxuBN_fPhv_8zciG6e-4MHDM_WJvANMDMF0Jqld74bjSR1KZYq9eF7lQVZPGop9R7c5MGVm7ghRxxCe06UzbBdnPsQpv9--5J6jNvRqd_l5_kV6sXHuTKWn6NphfxBB_AwMYdyNQaEtevPGMNv_f8aCgYKAWkSARESFQG1tDrpWcgMiCseX9JbIEekNvJDBw0166";

  const message = {
    to: "safishaikh401@gmail.com",
    cc: "sanu.shaikh2103@gmail.com",
    subject: "5555555555555555555555555555",
    text: "555555555558888888888888888888uuuuuuuuuuuuuuuuuuuuuu",
    html: "<p>llllllllllllllllllllllll</p>",
  };
  const boundary = "this_is_boundary";
  let multipart = [
    "MIMEVersion:1.0",
    `To: ${message.to}`,
    `From: ${userMail}`,
    `Subject: ${message.subject}`,
    `Content-Type: multipart/alternative; boundary=${boundary}` + "\n",
    "--" + boundary,
    `Content-Type: text/plain; Charset=UTF-8`,
    `Content-Transfer-Encoding: base64` + "\n",
    "",
    `${message.text}`,
    "",
    "--" + boundary,
    `Content-Type: text/html; Charset=UTF-8`,
    `Content-Transfer-Encoding: base64` + "\n",
    "",
    `${message.html}`,
    "",
    "--" + boundary,
  ];

  const encodedMessage = Buffer.from(
    `To: ${message.to}\r\n` +
      `Subject: ${message.subject}\r\n\r\n` +
      `${message.text}` +
      `${message.html}` +
      `${message.attach}`
  ).toString("base64");

  //   const data = JSON.stringify({
  //     raw: encodedMessage,
  //   });

  const result = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: data,
    }
  );

  const sentData = await result.json();

  console.log(sentData);
}
get();
