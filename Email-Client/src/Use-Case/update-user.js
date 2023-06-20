module.exports = function updateUserDetails({ Joi, userDB, userTemplet }) {
  return async function updateUser({
    id,
    email,
    name,
    picturePath,
    accessToken,
    refreshToken,
    expiresIn,
  }) {
    try {
      ValidateData({
        id,
        email,
        name,
        picturePath,
        accessToken,
        refreshToken,
        expiresIn,
      });

      await checkExistingMail({ email });

      const userValues = userTemplet({
        id,
        email,
        name,
        picturePath,
        accessToken,
        refreshToken,
        expiresIn,
      });
      const idValue = userValues.getId();
      const emailValue = userValues.getEmail();
      const nameValue = userValues.getName();
      const picturePathValue = userValues.getPicturePath();
      const accessTokenValue = userValues.getAccessToken();
      const refreshTokenValue = userValues.getRefreshToken();
      const expiresInValue = userValues.getExpiresIn();

      const result = await userDB.updateUserDBCockroach({
        id: idValue,
        email: emailValue,
        name: nameValue,
        picturePath: picturePathValue,
        accessToken: accessTokenValue,
        refreshToken: refreshTokenValue,
        expiresIn: expiresInValue,
      });
      const affectedRows =
        result.rowCount == undefined ? result.affectedRows : result.rowCount;

      return affectedRows;
    } catch (err) {
      console.log(err);
    }
  };
  function ValidateData({
    id,
    email,
    name,
    picturePath,
    accessToken,
    refreshToken,
    expiresIn,
  }) {
    const schema = Joi.object()
      .keys({
        id: Joi.string().required(),
        email: Joi.string().email().required(),
        name: Joi.string().min(3),
        picturePath: Joi.string().uri(),
        accessToken: Joi.string(),
        refreshToken: Joi.string(),
        expiresIn: Joi.string(),
      })
      .or("name", "picturePath", "accessToken", "refreshToken", "expiresIn");

    const result = schema.validate({
      id,
      email,
      name,
      picturePath,
      accessToken,
      refreshToken,
      expiresIn,
    });
    if (result.error)
      throw {
        error: "Forbidden Error",
        message: result.error.details[0].message,
      };

    return;
  }
  async function checkExistingMail({ email }) {
    const result = await userDB.getUserDBCockroach({ email });

    if (result.length === 0) {
      throw { error: "Validation Error", message: "User Does not Exists" };
    }

    return;
  }
};
