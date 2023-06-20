module.exports = function makeUserTemplet({ Joi }) {
  return function userTemplet({
    id,
    email,
    name,
    picturePath,
    accessToken,
    refreshToken,
    expiresIn,
  }) {
    const schema = Joi.object({
      id: Joi.string(),
      name: Joi.string().min(3),
      email: Joi.string().email(),
      picturePath: Joi.string().uri(),
      accessToken: Joi.string().min(3),
      refreshToken: Joi.string().min(3),
      expiresIn: Joi.string(),
    });

    const { value, error } = schema.validate({
      id,
      name,
      email,
      picturePath,
      accessToken,
      refreshToken,
      expiresIn,
    });
    if (error)
      throw {
        error: "Validation Error",
        message: error.details[0].message,
      };
    return Object.freeze({
      getId: () => value.id,
      getName: () => value.name,
      getEmail: () => value.email,
      getPicturePath: () => value.picturePath,
      getAccessToken: () => value.accessToken,
      getRefreshToken: () => value.refreshToken,
      getExpiresIn: () => value.expiresIn,
    });
  };
};
