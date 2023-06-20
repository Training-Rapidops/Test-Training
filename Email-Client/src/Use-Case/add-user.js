module.exports = function addUserDetails({
  Joi,
  userDB,
  addLabelByName,
  userTemplet,
  producer,
}) {
  return async function addUser({
    name,
    email,
    picturePath,
    access_token,
    refresh_token,
    expiresIn,
  }) {
    ValidateData({
      name,
      email,
      picturePath,
      access_token,
      refresh_token,
      expiresIn,
    });

    await checkExistingMail({ email });

    const userValues = userTemplet({
      name,
      email,
      picturePath,
      access_token,
      refresh_token,
      expiresIn,
    });
    const nameValue = userValues.getName();
    const emailValue = userValues.getEmail();
    const picturePathValue = userValues.getPicturePath();
    const access_tokenValue = userValues.getAccessToken();
    const refresh_tokenValue = userValues.getRefreshToken();
    const expiresInValue = userValues.getExpiresIn();

    const result = await userDB.addUserDBCockroach({
      name: nameValue,
      email: emailValue,
      picturePath: picturePathValue,
      access_token: access_tokenValue,
      refresh_token: refresh_tokenValue,
      expiresIn: expiresInValue,
    });

    const id = result.rows[0].id;

    const labels = ["IMPORTANT", "INBOX", "STARRED", "SENT", "TRASH"];

    for (let i = 0; i < Object.keys(labels).length; i++) {
      let label = labels[i];
      let syncedFolderId = "gcsugcyugcyudgcd";
      const data = await addLabelByName({
        id,
        label,
        syncedFolderId,
      });
    }

    await producer.connect();
    await producer.send({
      topic: "addLabel",
      messages: [
        {
          value: JSON.stringify({
            id: id,
            name: nameValue,
            email: emailValue,
            picturePath: picturePathValue,
            access_token: access_tokenValue,
            refresh_token: refresh_tokenValue,
            expiresIn: expiresInValue,
          }),
        },
      ],
    });
    await producer.disconnect();

    return { id: id };
  };
  function ValidateData({
    name,
    email,
    picturePath,
    access_token,
    refresh_token,
    expiresIn,
  }) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      picturePath: Joi.string().uri().required(),
      access_token: Joi.string().min(3).required(),
      refresh_token: Joi.string().min(3).required(),
      expiresIn: Joi.string().required(),
    });

    const { value, error } = schema.validate({
      name,
      email,
      picturePath,
      access_token,
      refresh_token,
      expiresIn,
    });
    if (error) {
      throw {
        error: "Validation Error",
        message: error.details[0].message,
      };
    }

    return;
  }
  async function checkExistingMail({ email }) {
    const result = await userDB.getUserDBCockroach({ email });
    if (result.length > 0) {
      throw { error: "forbidden Error", message: "User Already Exists" };
    }

    return;
  }
};

// // {
//   name: nameValue,
//   email: emailValue,
//   picturePath: picturePathValue,
//   access_token: access_tokenValue,
//   refresh_token: refresh_tokenValue,
// }
