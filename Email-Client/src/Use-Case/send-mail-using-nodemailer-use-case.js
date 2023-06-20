module.exports = function makeSendMailUsingNodemailerUseCase({
  Joi,
  nodemailer,
  getUserById,
}) {
  return async function sendMailUsingNodeMailer({
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

      const attachments = getAttachmentArray({ attachmentPaths, htmlBody });

      const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: userMail,
          accessToken: accessToken,
        },
      });

      const mailDetails = {
        from: userMail,
        to: to,
        cc: cc,
        bcc: bcc,
        subject: subject,
        text: textBody,
        html: htmlBody,
        attachments: attachments,
      };

      const data = await mailTransporter.sendMail(mailDetails);
      console.log(data, "????????????");

      return data;
    } catch (err) {
      console.log(err);
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

  function getAttachmentArray({ attachmentPaths, htmlBody }) {
    if (attachmentPaths) {
      let attachments = [],
        fileNameArray = [];
      let pathsArray = attachmentPaths.split(",");

      pathsArray.forEach((path) => {
        attachments.push({ path: path });
      });

      if (htmlBody > 0) {
        (altImgNameArray = []), (cidArray = []);
        for (let i = 0; i < pathsArray.length; i++) {
          fileNameArray.push(
            pathsArray[i].split("/")[pathsArray[i].split("/").length - 1]
          );
        }
        let imgArray = htmlBody.split("<img");
        for (let i = 1; i < imgArray.length; i++) {
          // regex to get string between two characters
          altImgNameArray.push(/(?<=alt=')(.*?)(?='>)/.exec(imgArray[i])[1]);
          cidArray.push(/(?<='cid:)(.*?)(?=')/.exec(imgArray[i])[1]);
        }

        for (let i = 0; i < altImgNameArray.length; i++) {
          attachments[fileNameArray.indexOf(altImgNameArray[i])]["cid"] =
            cidArray[i];
          attachments[fileNameArray.indexOf(altImgNameArray[i])]["filename"] =
            fileNameArray[fileNameArray.indexOf(altImgNameArray[i])];
        }

        console.log(attachments);
        return attachments;
      }
    }
  }
};
