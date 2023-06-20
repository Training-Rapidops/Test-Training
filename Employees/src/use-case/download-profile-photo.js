module.exports = function makeDownloadProfilePhoto({
  Joi,
  getProfilePhoto,
  path,
  fs,
  storage,
  ValidationError,
  NoDataFoundError,
}) {
  return async function downloadProfilePhoto({ id }) {
    const value = validateData({ id });
    ({ id } = value);

    const { profilePhoto } = await getProfilePhoto({ id });
    if (!profilePhoto) {
      throw new NoDataFoundError(`Employee data for id: ${id} not found`);
    }
    const fileName = profilePhoto.split("/").pop();
    var filePath = `${path.join(
      __dirname,
      `../../downloads/${id}/${fileName}`
    )}`;

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(`${path.join(__dirname, `../../downloads/${id}/`)}`, {
        recursive: true,
      });
    }

    const options = {
      destination: filePath,
    };

    await storage
      .bucket(config.gcpStorage.bucketName)
      .file(profilePhoto)
      .download(options);

    return {
      PhotoPath: filePath,
    };
  };

  function validateData({ id }) {
    const schema = Joi.object().keys({
      id: Joi.string().guid().required(),
    });

    const { value, error } = schema.validate({ id });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
