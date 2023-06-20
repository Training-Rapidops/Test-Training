function userRoleAssociationDB({ cockroach, DBError }) {
  return { addUserRoleAsociationDB };

  async function addUserRoleAsociationDB({ roleId, employeeId }) {
    try {
      const query =
        "INSERT INTO user_role_association_table(role_id,employee_id) VALUES($1,$2)";
      const values = [roleId, employeeId];

      const result = await cockroach.query(query, values);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }
}

module.exports = userRoleAssociationDB;
