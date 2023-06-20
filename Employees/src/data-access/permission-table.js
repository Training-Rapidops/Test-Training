function permissionDB({ cockroach, DBError }) {
  return { addPermissionDB };
  async function addPermissionDB({ companyId, role, permission, isMaster }) {
    try {
      const query =
        "INSERT INTO roles_permission_table(role,permission,company_id,is_master) VALUES($1,$2,$3) RETURNING id";
      const values = [role, permission, companyId, isMaster ? isMaster : false];

      const result = await cockroach.query(query, values);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }
}

module.exports = permissionDB;
