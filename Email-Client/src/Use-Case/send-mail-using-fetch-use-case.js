module.exports = function makeSendMailUsingFetchUseCase({
  Joi,
  fs,
  fetch,
  FileType,
  getUserById,
}) {
  return async function sendMailUsingFetch({
    id,
    to,
    cc,
    bcc,
    subject,
    textBody,
    htmlBody,
    attachmentPaths,
  }) {
    try {
      validateData({
        id,
        to,
        cc,
        bcc,
        subject,
        textBody,
        htmlBody,
        attachmentPaths,
      });

      const userData = await getUserData({ id });
      const userMail = userData.user_email_id;
      const accessToken = userData.access_token;

      console.log(userMail, accessToken);

      const message = {
        to: to,
        cc: cc,
        bcc: bcc,
        subject: subject,
        text: textBody,
        html: htmlBody,
      };

      const boundary = "this_is_boundary";
      const boundary2 = "this_is_boundary_2";
      const boundary3 = "this_is_boundary_3";

      const { attachmentsArray, inlineArray } =
        await getAttachmentsAndInlineArray({
          attachmentPaths,
          htmlBody,
        });

      const multipart = getMultipartBody({
        message,
        attachmentsArray,
        inlineArray,
        boundary,
        boundary2,
        boundary3,
      });

      const encodedMessage = Buffer.from(multipart.join("\r\n")).toString(
        "base64"
      );

      const data = JSON.stringify({
        raw: encodedMessage,
      });

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
      return sentData;
    } catch (err) {
      console.log(err, "}}}}}}}}}}}}}}}}}");
    }
  };

  function validateData({
    id,
    to,
    cc,
    bcc,
    subject,
    textBody,
    htmlBody,
    attachmentPaths,
  }) {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      to: Joi.string().email().required(),
      subject: Joi.string().allow(""),
      textBody: Joi.string().allow(""),
      htmlBody: Joi.string().optional(),
      cc: Joi.string().optional(),
      bcc: Joi.string().optional(),
      attachmentPaths: Joi.string().optional(),
    });

    const { value, error } = schema.validate({
      id,
      to,
      cc,
      bcc,
      subject,
      textBody,
      htmlBody,
      attachmentPaths,
    });
    if (error) {
      throw { error: "Validation Error", message: error.detail[0].message };
    }
    return;
  }

  async function getUserData({ id }) {
    const userData = await getUserById({ id });

    if (userData.length > 0) {
      return userData[0];
    } else {
      console.log("user Doesn't exists");
      //   throw { error: "Forbiddne Error", message: "User Doesn't exists" };
    }
  }

  async function getAttachmentsAndInlineArray({ attachmentPaths, htmlBody }) {
    if (attachmentPaths) {
      let pathsArray = attachmentPaths.split(","),
        attachmentsArray = [],
        inlineArray = [];
      TempArray = [];
      mimeTypeArray = [];

      for (let i = 0; i < pathsArray.length; i++) {
        let fileData = fs.readFileSync(pathsArray[i]);
        let mimeType = await FileType.fromBuffer(fileData);
        let fileContent = Buffer.from(fileData).toString("base64");

        TempArray.push({
          fileName:
            pathsArray[i].split("/")[pathsArray[i].split("/").length - 1],
          mimeType: mimeType.mime,
          bytes: fileContent,
        });
      }

      let altNameArray = [],
        cidArray = [];

      if (htmlBody > 0) {
        let imgArray = htmlBody.split("<img");

        for (let i = 1; i < imgArray.length; i++) {
          // regex to get string between two characters
          altNameArray.push(/(?<=alt=')(.*?)(?='>)/.exec(imgArray[i])[1]);
          cidArray.push(/(?<='cid:)(.*?)(?=')/.exec(imgArray[i])[1]);
        }
      }

      if (cidArray) {
        for (let i = 0; i < TempArray.length; i++) {
          if (altNameArray.indexOf(TempArray[i].fileName) !== -1) {
            TempArray[i].cid =
              cidArray[altNameArray.indexOf(TempArray[i].fileName)];
            inlineArray.push(TempArray[i]);
          } else {
            attachmentsArray.push(TempArray[i]);
          }
        }
      }
      return { attachmentsArray, inlineArray };
    }
  }

  function getMultipartBody({
    message,
    attachmentsArray,
    inlineArray,
    boundary,
    boundary2,
    boundary3,
  }) {
    let multipart = [`To: ${message.to}`, `Subject: ${message.subject}`];
    const nl = "\n";
    if (attachmentsArray.length) {
      multipart.push(
        `Content-Type: multipart/mixed; boundary="${boundary}"` +
          "\n" +
          "\r\n" +
          "--" +
          boundary
      );

      if (inlineArray.length > 0) {
        multipart.push(
          `Content-Type: multipart/related; boundary="${boundary2}"` +
            "\n" +
            "\r\n" +
            "--" +
            boundary2
          // +
          // "\r\n" +
          // `Content-Type: multipart/alternative; boundary="${boundary3}"` +
          // "\n" +
          // "\r\n"
        );
        multipart.push(getTextAndHtmlString(message, boundary2, boundary3));
        multipart.push(getAttachmentString(inlineArray, boundary2));

        multipart.push(getAttachmentString(attachmentsArray, boundary));
      } else {
        // multipart.push(
        //   `Content-Type: multipart/alternative; boundary="${boundary2}"` +
        //     "\n" +
        //     "\r\n"
        // );

        multipart.push(getTextAndHtmlString(message, boundary, boundary2));

        multipart.push(getAttachmentString(attachmentsArray, boundary));
      }
    } else {
      if (inlineArray.length > 0) {
        multipart.push(
          `Content-Type: multipart/related; boundary="${boundary}"` +
            "\n" +
            "\r\n" +
            "--" +
            boundary +
            "\r\n"
          // +
          // `Content-Type: multipart/alternative; boundary="${boundary2}"` +
          // "\n" +
          // "\r\n"
        );
        multipart.push(getTextAndHtmlString(message, boundary, boundary2));
        multipart.push(getAttachmentString(inlineArray, boundary));
      } else {
        multipart.push(
          `Content-Type: multipart/alternative; boundary="${boundary}"` + "\n"
        );

        multipart.push(getTextAndHtmlString(message, boundary));
      }
    }

    return multipart;
  }

  function getAttachmentString(array, boundary) {
    var string = "";
    const nl = "\n";

    for (var i = 0; i < array.length; i++) {
      string +=
        "--" +
        boundary +
        "\r\n" +
        "Content-Type: " +
        array[i].mimeType +
        '; name="' +
        array[i].fileName +
        '"' +
        "\r\n" +
        'Content-Disposition: attachment; filename="' +
        array[i].fileName +
        '"' +
        "\r\n";
      "Content-Transfer-Encoding: base64" + nl + "\r\n";
      if (array[i].cid) {
        string += "Content-ID: " + array[i].cid + +"\n" + "\r\n";
      }
      string += "\r\n";
      string += array[i].bytes + "\r\n";
    }

    string += "--" + boundary + "--" + "\n" + "\r\n";

    return string;
  }

  function getTextAndHtmlString(message, preboundary, boundary) {
    // between optimization
    let string = "",
      initBoundary = "--" + boundary + "\r\n",
      initPreboundary = "--" + preboundary + "\r\n",
      textString =
        "--" +
        boundary +
        "\r\n" +
        `Content-Type: text/plain; Charset=UTF-8` +
        "\n" +
        "\r\n" +
        "" +
        `${message.text}` +
        "" +
        "\n" +
        "\r\n",
      htmlString =
        `--` +
        boundary +
        "\r\n" +
        `Content-Type: text/html; Charset=UTF-8` +
        "\n" +
        "\r\n" +
        "" +
        `${message.html}` +
        "" +
        "\n" +
        "\r\n",
      closeBoundary = "--" + boundary + "--" + "\n";
    if (message.text) {
      if (message.html) {
        string +=
          "\r\n" +
          `Content-Type: multipart/alternative; boundary="${boundary}"` +
          "\n" +
          "\r\n" +
          textString +
          htmlString +
          closeBoundary;
      } else {
        string += textString + closeBoundary;
      }
    } else {
      if (message.html) {
        string += htmlString;
      }
    }
    return string;
  }
};
