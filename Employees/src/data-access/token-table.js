function tokenDB({ cockroach, DBError }) {
  return {
    addTokenDB,
    getTokenByEmpId,
    updateTokenDB,
    getAllSessionsDB,
    deleteSessionDB,
  };

  async function addTokenDB({
    employeeId,
    jwtToken,
    expireTime,
    browser,
    device,
    ipAddress,
    location,
  }) {
    try {
      const values = [
        employeeId,
        jwtToken,
        expireTime,
        browser,
        device,
        ipAddress,
        location,
      ];

      const query =
        "INSERT INTO token_table(employee_id,jwt_token,expire_time,browser,device,ip_address,location) Values($1,$2,$3,$4,$5,$6,$7) Returning id,jwt_token";
      const result = await cockroach.query(query, values);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function getAllSessionsDB({ employeeId, sortBy, filterBy }) {
    try {
      let i = 1;
      let query = `SELECT * FROM token_table WHERE employee_id = $${i}`;
      let values = [employeeId];
      i++;
      if (sortBy) {
        if (filterBy) {
          for (filterData of filterBy) {
            key = filterData.split(":")[0];
            val = filterData.split(":")[1];
            query += ` AND ${key
              .replace(/([a-z])([A-Z])/g, "$1_$2")
              .toLowerCase()} LIKE '%${val}%'`;
          }

          // values.push(val);
          // i++;
        }
        query += ` ORDER BY ${sortBy
          .replace(/([a-z])([A-Z])/g, "$1_$2")
          .toLowerCase()}`;
      } else if (filterBy) {
        for (filterData of filterBy) {
          key = filterData.split(":")[0];
          val = filterData.split(":")[1];
          query += ` AND ${key
            .replace(/([a-z])([A-Z])/g, "$1_$2")
            .toLowerCase()} LIKE '%${val}%'`;
        }
      }

      const { rows } = await cockroach.query(query, values);

      return rows;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function getTokenByEmpId({ employeeId }) {
    try {
      const values = [employeeId];
      const query = "SELECT * FROM token_table WHERE employee_id = $1";

      const { rows } = await cockroach.query(query, values);

      return rows;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function updateTokenDB({ employeeId, jwtToken, expireTime }) {
    try {
      let query = "UPDATE token_table SET";
      if (employeeId) {
        query += ` employee_id = ${employeeId}`;
      }
      if (expireTime) {
        query += ` expire_time = ${expireTime}`;
      }

      query += ` WHERE jwt_token = '${jwtToken}'`;

      const result = await cockroach.query(query);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }

  async function deleteSessionDB({ tokenId, employeeId }) {
    try {
      const values = [employeeId];
      let str = "";
      for (i = 1; i < tokenId.length; i++) {
        str += `$${i + 1},`;
        values.push(tokenId[i - 1]);
      }
      str += `$${tokenId.length + 1}`;
      values.push(tokenId[tokenId.length - 1]);
      const query = `DELETE FROM token_table WHERE employee_id = $1 AND id IN (${str})`;

      const result = await cockroach.query(query, values);

      return result;
    } catch (err) {
      throw new DBError(err.detail || err.message);
    }
  }
}

module.exports = tokenDB;

// query: "SELECT * FROM token_table WHERE employee_id = $1 AND ip_address LIKE '%$2%' ORDER BY location",
// employee-container  |   values: [ '4358dc64-182e-4e73-8543-0f33b7e53253', '2.2.2.2' ]
