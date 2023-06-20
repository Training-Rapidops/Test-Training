module.exports = function makeAddUserRoleAssociation({
  Joi,
  userRoleAssociationTemplet,
  userRoleAssociationDB,
  ValidationError,
}) {
  return async function addUserRoleAsociation({ roleId, employeeId }) {
    const value = validateData({ roleId, employeeId });
    ({ roleId, employeeId } = value);

    const userRoleAssociationValues = userRoleAssociationTemplet({
      roleId,
      employeeId,
    });

    const roleIdvalue = userRoleAssociationValues.getRoleId(),
      employeeIdValue = userRoleAssociationValues.getEmployeeId();

    const result = await userRoleAssociationDB.addUserRoleAsociationDB({
      roleId: roleIdvalue,
      employeeId: employeeIdValue,
    });

    const id = result.rows[0].id;

    return id;
  };

  function validateData({ roleId, employeeId }) {
    const schema = Joi.object().keys({
      roleId: Joi.string().guid().required(),
      employeeId: Joi.string().guid().required(),
    });

    const { value, error } = schema.validate({ roleId, employeeId });
    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
