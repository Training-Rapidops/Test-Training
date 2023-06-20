module.exports = function makeAddCompanyAction({
  Joi,
  addCompany,
  ValidationError,
}) {
  return async function addCompanyAction(req, res) {
    try {
      const {
        name,
        address,
        ownerName,
        ownerAddress,
        ownerMail,
        ownerPassword,
        contectNo,
        contectEmail,
      } = req.body;
      const [ownerPhoto] = req.files;

      validateData({
        name,
        address,
        ownerName,
        ownerAddress,
        ownerMail,
        ownerPassword,
        ownerPhoto,
        contectNo,
        contectEmail,
      });

      const addCompanyDetails = await addCompany({
        name,
        address,
        ownerName,
        ownerAddress,
        ownerMail,
        ownerPassword,
        ownerPhoto,
        contectNo,
        contectEmail,
      });

      res.status(201).json({ status: "success", body: addCompanyDetails });
    } catch (err) {
      console.log(err);
      res.status(err.httpStatusCode || 500).json({
        status: "error",
        name: err.name,
        message: err.message,
        date: err.date,
      });
    }
  };

  function validateData({
    name,
    address,
    ownerName,
    ownerAddress,
    ownerMail,
    ownerPassword,
    ownerPhoto,
    contectNo,
    contectEmail,
  }) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).required(),
      address: Joi.string().min(5).required(),
      ownerName: Joi.string().min(3).required(),
      ownerAddress: Joi.string().min(5).required(),
      ownerMail: Joi.string().email().required(),
      ownerPassword: Joi.string()
        .regex(/^(?=.*[A-Z])(?=.*[0-9]).*$/)
        .min(8)
        .max(20)
        .required(),
      ownerPhoto: Joi.object()
        .keys({
          fieldname: Joi.string().valid("ownerPhoto").required(),
          originalname: Joi.string().required(),
        })
        .unknown()
        .required(),
      contectNo: Joi.number().integer().required(),
      contectEmail: Joi.string().email().required(),
    });
    const { value, error } = schema.validate({
      name,
      address,
      ownerName,
      ownerAddress,
      ownerMail,
      ownerPassword,
      ownerPhoto,
      contectNo,
      contectEmail,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
