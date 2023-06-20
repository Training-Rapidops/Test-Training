function employeeDB({ cockroach, DBError }) {
  return {
    addEmployeeDB,
    getEmployeeDB,
    getEmployeeByEmailDB,
    getAllEmployeesDB,
    getAllEmployeesByCompanyNameDB,
    updateEmployeeDB,
    deleteEmployeeDB,
    deleteEmployeesByCompanyDB,
    varifyEmployeeDB,
    updateMultipleEmployeesDB,
  };

  async function addEmployeeDB({
    name,
    email,
    password,
    address,
    companyId,
    role,
    profilePhoto,
  }) {
    try {
      const values = [
        name,
        email,
        password,
        address,
        companyId,
        role,
        profilePhoto,
      ];
      const query =
        "INSERT INTO employee_table(employee_name,employee_email,employee_password,employee_address,company_id,employee_role,profile_photo) VALUES($1,$2,$3,$4,$5,$6,$7) Returning id";
      const result = await cockroach.query(query, values);

      return result;
    } catch (err) {
      throw new DBError(err.detail ? err.detail : err.message);
    }
  }

  async function getEmployeeDB({ id }) {
    try {
      const values = [id];
      const query = "SELECT * FROM employee_table WHERE id = $1";

      const { rows } = await cockroach.query(query, values);

      return rows;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function getEmployeeByEmailDB({ email }) {
    try {
      const values = [email];
      const query = "SELECT * FROM employee_table WHERE employee_email = $1";

      const { rows } = await cockroach.query(query, values);

      return rows;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function getAllEmployeesDB({ limit, offset }) {
    try {
      let query = "SELECT * FROM employee_table ";

      let values = [];
      if (limit) {
        query += " LIMIT $1";
        values.push(+limit);
      }
      if (offset) {
        query += " OFFSET $2";
        values.push(+offset);
      }

      const { rows } = await cockroach.query(query, values);

      return rows;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function getAllEmployeesByCompanyNameDB({ limit, offset, companyId }) {
    try {
      let query = "SELECT * FROM employee_table ";

      query += ` WHERE company_id = $1`;

      let values = [companyId];
      let i = 2;
      if (limit) {
        query += ` LIMIT $${i}`;
        values.push(+limit);
        i++;
      }
      if (offset) {
        query += ` OFFSET $${i}`;
        values.push(+offset);
        i++;
      }

      const { rows } = await cockroach.query(query, values);

      return rows;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function updateEmployeeDB({ id, updateData }) {
    try {
      const query = `UPDATE employee_table SET ("${Object.keys(updateData).join(
        '","'
      )}")=('${Object.values(updateData).join("','")}') WHERE id= '${id}'`;

      const result = await cockroach.query(query);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function updateMultipleEmployeesDB({ updateDataObj, idArray }) {
    try {
      let query = `UPDATE employee_table SET`;

      let keys = Object.keys(updateDataObj);

      keys.forEach((key) => {
        query += ` ${key
          .replace(/([a-z])([A-Z])/g, "$1_$2")
          .toLowerCase()} = CASE `;

        let i = 0;
        updateDataObj[key].forEach((val) => {
          query += ` WHEN id = '${val[i]}' THEN '${val[i + 1]}'`;
        });

        query += ` ELSE ${key
          .replace(/([a-z])([A-Z])/g, "$1_$2")
          .toLowerCase()} END,`;
      });

      query = query.substring(0, query.length - 1);

      query += ` WHERE id IN ('${idArray.join("','")}')`;

      console.log(query, "\n\n\n");

      const result = await cockroach.query(query);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function deleteEmployeeDB({ id }) {
    try {
      const values = [id];
      const query = "DELETE FROM employee_table WHERE id = $1";

      const result = await cockroach.query(query, values);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function deleteEmployeesByCompanyDB({ companyId }) {
    try {
      const values = [companyId];
      const query = "DELETE FROM employee_table WHERE company_id = $1";

      const result = await cockroach.query(query, values);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function varifyEmployeeDB({ email }) {
    try {
      const values = [email];
      const query = `UPDATE employee_table SET is_varified = 'true' WHERE employee_email = $1`;

      const result = await cockroach.query(query, values);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }
}

module.exports = employeeDB;
