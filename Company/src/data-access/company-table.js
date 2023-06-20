function companyDB({ cockroach, DBError }) {
  return {
    addcompanyDB,
    getCompanyDB,
    getCompanyByNameDB,
    getAllCompanyDB,
    updateCompanyDB,
    deleteCompanyDB,
  };

  async function addcompanyDB({ name, address, contectNo, contectEmail }) {
    try {
      const values = [name, address, contectNo, contectEmail];
      const query =
        "INSERT INTO comapany_table(company_name,company_address,contect_no,contect_email) VALUES($1,$2,$3,$4) Returning id";

      const result = await cockroach.query(query, values);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function getCompanyDB({ id }) {
    try {
      const values = [id];
      const query = "SELECT * FROM comapany_table WHERE id = $1";

      const { rows } = await cockroach.query(query, values);

      return rows;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function getCompanyByNameDB({ name }) {
    try {
      const values = [name];
      const query = "SELECT * FROM comapany_table WHERE company_name = $1";

      const { rows } = await cockroach.query(query, values);

      return rows;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function getAllCompanyDB({ limit, offset }) {
    try {
      let query = "SELECT * FROM comapany_table";
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

  async function updateCompanyDB({ id, updateData }) {
    try {
      const query = `UPDATE comapany_table SET ("${Object.keys(updateData).join(
        '","'
      )}")=('${Object.values(updateData).join("','")}') WHERE id = '${id}'`;
      const result = await cockroach.query(query);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function deleteCompanyDB({ id }) {
    try {
      const values = [id];
      const query = "DELETE FROM comapany_table WHERE id = $1 ";

      const result = await cockroach.query(query, values);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }
}

module.exports = companyDB;
