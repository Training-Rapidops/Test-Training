module.exports = function makeAddEmployeeAction({
  Joi,
  addEmployee,
  ValidationError,
}) {
  return async function addEmployeeAction(req, res) {
    try {
      const { name, email, password, address, companyName, role } = req.body;
      const [profilePhoto] = req.files;

      validateData({
        name,
        email,
        password,
        address,
        companyName,
        role,
        profilePhoto,
      });

      const addEmployeeDetails = await addEmployee({
        name,
        email,
        password,
        address,
        companyName,
        role,
        profilePhoto,
      });

      res.status(201).json({ status: "success", body: addEmployeeDetails });
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
    email,
    password,
    address,
    companyName,
    role,
    profilePhoto,
  }) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^(?=.*[A-Z])(?=.*[0-9]).*$/)
        .min(8)
        .max(20)
        .required(),
      address: Joi.string().min(5).required(),
      companyName: Joi.string().min(3).required(),
      role: Joi.string().min(3).required(),
      profilePhoto: Joi.object()
        .keys({
          fieldname: Joi.string().valid("profilePhoto").required(),
          originalname: Joi.string().required(),
          buffer: Joi.binary(),
        })
        .unknown()
        .required(),
    });

    const { value, error } = schema.validate({
      name,
      email,
      password,
      address,
      companyName,
      role,
      profilePhoto,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
