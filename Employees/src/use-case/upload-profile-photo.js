module.exports = function makeUploadPrfilePhoto({
  Joi,
  storage,
  config,
  path,
  ValidationError,
}) {
  return async function uploadPrfilePhoto({ id, profilePhoto, fileName }) {
    const value = validateData({ id, profilePhoto, fileName });
    ({ id, profilePhoto, fileName } = value);

    const options = {
      destination: config.gcpStorage.folderName + `/${id}/` + `${fileName}`,
      public: true,
    };

    await storage
      .bucket(config.gcpStorage.bucketName)
      .file(options.destination)
      .save(profilePhoto);

    await storage
      .bucket(config.gcpStorage.bucketName)
      .file(options.destination)
      .makePublic();

    return {
      fileName: config.gcpStorage.folderName + `/${id}/` + `${fileName}`,
    };
  };

  function validateData({ id, profilePhoto, fileName }) {
    const schema = Joi.object().keys({
      id: Joi.string().guid().required(),
      profilePhoto: Joi.binary().required(),
      fileName: Joi.string().required(),
    });
    const { value, error } = schema.validate({
      id,
      profilePhoto,
      fileName,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
