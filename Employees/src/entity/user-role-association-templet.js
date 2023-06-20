module.exports = function makeUserRoleAssociationTemplet({
  Joi,
  ValidationError,
}) {
  return function userRoleAssociationTemplet({ roleId, employeeId }) {
    const schema = Joi.object().keys({
      roleId: Joi.string().guid(),
      employeeId: Joi.string().guid(),
    });

    const { value, error } = schema.validate({
      roleId,
      employeeId,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
    return {
      getRoleId: () => value.roleId,
      getEmployeeId: () => value.employeeId,
    };
  };
};
