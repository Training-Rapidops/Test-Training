module.exports = function makeAddEmployee({
  Joi,
  producer,
  bcrypt,
  employeeTemplet,
  employeeDB,
  getCompanyByNameCall,
  updateEmployee,
  ValidationError,
}) {
  return async function makeAddEmployee({
    name,
    email,
    password,
    address,
    companyName,
    role,
    profilePhoto,
  }) {
    /**
     * Added Employee
     * here employee only proides company name so company id is provided by service call to company port
     */

    try {
      const value = validateData({
        name,
        email,
        password,
        address,
        companyName,
        role,
        profilePhoto,
      });

      ({ name, email, password, address, companyName, role, profilePhoto } =
        value);

      const companyDetails = await getCompanyByNameCall({ name: companyName });

      const companyId = companyDetails.id;

      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword, "..................");

      const employeeValues = employeeTemplet({
        name,
        email,
        password: hashPassword,
        address,
        companyId,
        role,
        profilePhoto: profilePhoto.originalname,
      });

      const nameValue = employeeValues.getName(),
        emailvalue = employeeValues.getEmail(),
        passwordvalue = employeeValues.getPassword(),
        addressValue = employeeValues.getAddress(),
        companyIdValue = employeeValues.getCompanyId(),
        roleValue = employeeValues.getRole(),
        profilePhotoValue = employeeValues.getProfilePhoto();

      const result = await employeeDB.addEmployeeDB({
        name: nameValue,
        email: emailvalue,
        password: passwordvalue,
        address: addressValue,
        companyId: companyIdValue,
        role: roleValue,
        profilePhoto: profilePhotoValue,
      });

      const id = result.rows[0].id;

      const { fileName } = await uploadPrfilePhoto({
        id,
        profilePhoto: profilePhoto.buffer,
        fileName: profilePhoto.originalname,
      });

      const data = await updateEmployee({
        id,
        profilePhoto: fileName,
      });

      await producer.connect();
      await producer.send({
        topic: "sendmails",
        messages: [
          {
            value: JSON.stringify({
              employeeEmail: emailvalue,
              companyEmail: companyDetails.contect_email,
            }),
          },
        ],
      });
      await producer.disconnect();
      return { id };
    } catch (err) {
      // if (err.hasOwnProperty("detail")) {
      //   throw new DBError(err.detail);
      // }
      throw err;
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
      name: Joi.string().min(3).trim().required(),
      email: Joi.string().email().trim().required(),
      password: Joi.string()
        .regex(/^(?=.*[A-Z])(?=.*[0-9]).*$/)
        .min(8)
        .max(20)
        .trim()
        .required(),
      address: Joi.string().trim().min(5).required(),
      companyName: Joi.string().trim().min(3).required(),
      role: Joi.string().trim().min(3).required(),
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
    return value;
  }
};
