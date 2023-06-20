module.exports = function makeAddPermission({
  Joi,
  api_enums,
  getEmployee,
  addUserRoleAssociation,
  permissionTemplet,
  permissionDB,
  ValidationError,
  NoDataFoundError,
}) {
  return async function addPermission({
    authToken,
    employeeId,
    // companyId,
    role,
    permission,
    isMaster,
  }) {
    const value = validateData({
      authToken,
      employeeId,
      // companyId,
      role,
      permission,
      isMaster,
    });
    ({ authToken, employeeId, role, permission, isMaster } = value);

    const companyId = getEmployeeCompanyId({ employeeId });
    const enumsPaths = Object.values(api_enums),
      enumsKeys = Object.keys(api_enums),
      permissionObj = {};

    console.log(enumsPaths, "\n\n\n", permission);

    for (let j = 0; j < permission.length; j++) {
      let index = enumsPaths.indexOf(permission[j]);
      if (index !== -1) {
        console.log("here");
        permissionObj.enumsKeys[index] = true;
      } else {
        throw new NoDataFoundError(
          `Given Path ${permission[j]} does not exists`
        );
      }
    }

    const permissionValues = permissionTemplet({
      companyId,
      role,
      permission: permissionObj,
      isMaster,
    });

    const companyIdValue = permissionValues.getCompanyId(),
      roleValue = permissionValues.getRole(),
      permissionValue = permissionValues.getPermission(),
      isMasterValue = permissionValues.getIsMaster();

    const result = await permissionDB.addPermission({
      companyId: companyIdValue,
      role: roleValue,
      permission: permissionValue,
      isMaster: isMasterValue,
    });

    const roleId = result.rows[0].id;

    await addUserRoleAssociation({ employeeId, roleId });

    return roleId;
  };
  function validateData({ authToken, employeeId, role, permission, isMaster }) {
    const schema = Joi.object().keys({
      authToken: Joi.string().required(),
      employeeId: Joi.string().guid().required(),
      // companyId: Joi.string().guid().required(),
      role: Joi.string().min(3).required(),
      permission: Joi.array().items().min(1).required(),
      isMaster: Joi.string(),
    });

    const { value, error } = schema.validate({
      authToken,
      employeeId,
      // companyId,
      role,
      permission,
      isMaster,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
  async function getEmployeeCompanyId({ employeeId }) {
    const result = await getEmployee({ employeeId });

    if (result) {
      return result.company_id;
    }
    throw new NoDataFoundError(`No employee found for ${employeeId}`);
  }
};
