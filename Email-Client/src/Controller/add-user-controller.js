module.exports = function makeAddUserAction({ Joi, addDetailsUseCase }) {
  return async function addUserDataAction(req, res) {
    try {
      const {
        name,
        email,
        picturePath,
        access_token,
        refresh_token,
        expiresIn,
      } = req.body;
      ValidateData({
        name,
        email,
        picturePath,
        access_token,
        refresh_token,
        expiresIn,
      });

      const addDetails = await addDetailsUseCase({
        name,
        email,
        picturePath,
        access_token,
        refresh_token,
        expiresIn,
      });
      const id = addDetails.id;

      const response = addDetails;

      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      const error = err.message || err.detail;
      res.status(403).send(error);
    }
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
    if (error)
      throw {
        error: "Validation Error kjhciudgciudciudwgciuwg",
        message: error.details[0].message,
      };

    return;
  }
};

// text only = text/plain
// html only = text/html
// attachment only = image/png
// text and html = multipart/alternative
// text and html and attachmet = multipar/mixed  multipart/alternative
// text and html and inline = multipart/related
// text and html and inline and attachment = multipar/mixed   multipart/related
