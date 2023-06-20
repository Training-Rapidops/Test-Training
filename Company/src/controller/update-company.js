module.exports = function makeUpdateCompanyAction({
  Joi,
  updateCompany,
  ValidationError,
}) {
  return async function updateCompanyAction(req, res) {
    try {
      const { id } = req.params;
      const { name, address, contectNo, contectEmail } = req.body;

      validateData({
        id,
        name,
        address,
        contectNo,
        contectEmail,
      });

      const updateCompanyDetails = await updateCompany({
        id,
        name,
        address,
        contectNo,
        contectEmail,
      });

      res.status(201).json({ status: "success", body: updateCompanyDetails });
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

  function validateData({ id, name, address, contectNo, contectEmail }) {
    const schema = Joi.object()
      .keys({
        id: Joi.string().guid().required(),
        name: Joi.string().min(3),
        address: Joi.string().min(5),
        contectNo: Joi.number().integer().min(6),
        contectEmail: Joi.string().email(),
      })
      .or("name", "address", "contectNo", "contectEmail");

    const { value, error } = schema.validate({
      id,
      name,
      address,
      contectNo,
      contectEmail,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
