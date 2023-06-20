module.exports = function makePermissionTemplet({ Joi, ValidationError }) {
  return function permissionTemplet({ companyId, role, permission, isMaster }) {
    const schema = Joi.object().keys({
      companyId: Joi.string().guid(),
      role: Joi.string().min(3),
      permission: Joi.array().items().min(1),
      isMaster: Joi.string(),
    });

    const { value, error } = schema.validate({
      companyId,
      role,
      permission,
      isMaster,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
    return {
      getCompanyId: () => value.companyId,
      getRole: () => value.role,
      getPermission: () => value.permission,
      getIsMaster: () => value.isMaster,
    };
  };
};
