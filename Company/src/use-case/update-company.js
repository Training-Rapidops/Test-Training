module.exports = function makeUpdateCompanyUseCase({
  Joi,
  companyDB,
  companyTemplet,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function updateCompany({
    id,
    name,
    address,
    contectNo,
    contectEmail,
  }) {
    /**Update Company Details By Id */

    try {
      const value = validateData({
        id,
        name,
        address,
        contectNo,
        contectEmail,
      });
      ({ id, name, address, contectNo, contectEmail } = value);

      const companyValues = companyTemplet({
        name,
        address,
        contectNo,
        contectEmail,
      });

      const namevalue = companyValues.getName();
      const addressValue = companyValues.getAddress();
      const contectNoValue = companyValues.getContectNo();
      const contectEmailValue = companyValues.getContectEmail();

      let updateData = {};
      if (namevalue) {
        updateData.company_name = namevalue;
      }
      if (addressValue) {
        updateData.company_address = addressValue;
      }
      if (contectNoValue) {
        updateData.contect_no = contectNoValue;
      }
      if (contectEmailValue) {
        updateData.contect_email = contectEmailValue;
      }

      const result = await companyDB.updateCompanyDB({
        id,
        updateData,
      });

      affectedRows = result.rowCount;

      if (affectedRows > 0) {
        return { affectedRows };
      } else {
        throw new NoDataFoundError(`Company with id ${id} doesn't exists`);
      }
    } catch (err) {
      // if (err.detail) {
      //   throw new DBError(err.hasOwnProperty("detail"));
      // }
      throw err;
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
    return value;
  }
};
