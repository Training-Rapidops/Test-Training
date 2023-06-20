module.exports = function makeAddCompanyUseCase({
  Joi,
  companyTemplet,
  companyDB,
  addOwnerCall,
  ValidationError,
  DBError,
}) {
  return async function addCompany({
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
    /**
     * Added company and its owner
     * owner is added as an employee with role owner via service call to employee port
     */

    try {
      const value = validateData({
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
      ({ name, address, owner, contectNo, contectEmail } = value);

      const companyValues = companyTemplet({
        name,
        address,
        contectNo,
        contectEmail,
      });

      const nameValue = companyValues.getName();
      const addressValue = companyValues.getAddress();
      const contectNoValue = companyValues.getContectNo();
      const contectEmailValue = companyValues.getContectEmail();

      const result = await companyDB.addcompanyDB({
        name: nameValue,
        address: addressValue,
        contectNo: contectNoValue,
        contectEmail: contectEmailValue,
      });

      const id = result.rows[0].id;

      const addOwnerCallDetails = await addOwnerCall({
        name: ownerName,
        address: ownerAddress,
        email: ownerMail,
        password: ownerPassword,
        companyName: name,
        role: "owner",
        profilePhoto: ownerPhoto,
      });

      return { id };
    } catch (err) {
      // if (err.hasOwnProperty("detail")) {
      //   throw new DBError(err.message);
      // }
      throw err;
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
    return value;
  }
};
