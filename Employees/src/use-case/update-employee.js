module.exports = function makeUpdateEmployee({
  Joi,
  employeeTemplet,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function updateEmployee({
    id,
    name,
    email,
    password,
    address,
    companyId,
    role,
    profilePhoto,
  }) {
    /**
     *
     * update Employee details with id
     * here employee name and company id canot be changes
     * company id because company details migt get updated but company id must not change
     * and employee name will not change as it is unlikly that employee change his/her name
     */

    try {
      const value = validateData({
        id,
        name,
        email,
        password,
        address,
        role,
        profilePhoto,
      });
      ({ id, name, email, password, address, role, profilePhoto } = value);

      const employeeValues = employeeTemplet({
        name,
        email,
        password,
        address,
        role,
        profilePhoto,
      });

      const nameValue = employeeValues.getName(),
        emailValue = employeeValues.getEmail(),
        passwordvalue = employeeValues.getPassword(),
        addressValue = employeeValues.getAddress(),
        roleValue = employeeValues.getRole(),
        profilePhotoValue = employeeValues.getProfilePhoto();

      let updateData = {};
      if (nameValue) {
        updateData.employee_name = nameValue;
      }
      if (emailValue) {
        updateData.employee_email = emailValue;
      }
      if (passwordvalue) {
        updateData.employee_password = passwordvalue;
      }
      if (addressValue) {
        updateData.employee_address = addressValue;
      }
      if (roleValue) {
        updateData.employee_role = roleValue;
      }
      if (profilePhotoValue) {
        updateData.profile_photo = profilePhotoValue;
      }

      const result = await employeeDB.updateEmployeeDB({
        id,
        updateData,
      });
      const affectedRows = result.rowCount;
      if (affectedRows > 0) {
        return { affectedRows };
      } else {
        throw new NoDataFoundError(`Employee With id ${id} doesn't Exists`);
      }
    } catch (err) {
      // if (err.detail) {
      //   throw new DBError(err.detail);
      // }
      throw err;
    }
  };

  function validateData({ id, address, role }) {
    const schema = Joi.object()
      .keys({
        id: Joi.string().guid().required(),
        address: Joi.string().min(5),
        role: Joi.string().min(3),
      })
      .or("address", "role");

    const { value, error } = schema.validate({
      id,
      address,
      role,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
