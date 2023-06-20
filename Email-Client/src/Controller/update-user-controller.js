module.exports = function makeUpdateUserAction({ Joi, updateDetailsUseCase }) {
  return async function updateUserDataAction(req, res) {
    try {
      const id = req.params.id;
      const { email, name, picturePath, accessToken, refreshToken, expiresIn } =
        req.body;
      ValidateData({
        id,
        email,
        name,
        picturePath,
        accessToken,
        refreshToken,
        expiresIn,
      });

      const updateDetails = await updateDetailsUseCase({
        id,
        email,
        name,
        picturePath,
        accessToken,
        refreshToken,
        expiresIn,
      });
      const response = updateDetails + " User Updated Successfully";

      res.status(200).send(response);
      // res.status(200).send("yes");
    } catch (err) {
      console.log(err);
      const error = err.message || err.detail;
      console.log(err);
      res.status(403).send(error);
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
};
