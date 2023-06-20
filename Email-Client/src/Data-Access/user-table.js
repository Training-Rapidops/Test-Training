function userDB({ mysql, cockroach }) {
  return {
    getAllUserDB,
    getUserByIdDB,
    getUserDB,
    addUserDB,
    deleteUserDB,
    updateUserDB,
    getAllUserDBCockroach,
    getUserByIdDBCockroach,
    getUserDBCockroach,
    addUserDBCockroach,
    deleteUserDBCockroach,
    updateUserDBCockroach,
  };

  async function getAllUserDBCockroach({ limit, offset }) {
    let query = "SELECT * FROM users";
    let args = [];
    if (limit) {
      query += " LIMIT $1";
      args.push(+limit);
    }
    if (offset) {
      query += " OFFSET $2";
      args.push(+offset);
    }

    const { rows } = await cockroach.query(query, args);

    return rows;
  }

  async function getUserByIdDBCockroach({ id }) {
    const { rows } = await cockroach.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    return rows;
  }

  async function getUserDBCockroach({ email }) {
    const { rows } = await cockroach.query(
      "SELECT * FROM users WHERE user_email_id = $1",
      [email]
    );

    return rows;
  }

  async function addUserDBCockroach({
    name,
    email,
    picturePath,
    access_token,
    refresh_token,
    expiresIn,
  }) {
    const values = [
      name,
      email,
      picturePath,
      access_token,
      refresh_token,
      expiresIn,
    ];
    const result = await cockroach.query(
      "INSERT INTO users(name,user_email_id,picture_path,access_token,refresh_token,expires_in) VALUES($1,$2,$3,$4,$5,$6) Returning id",
      values
    );

    return result;
  }

  async function deleteUserDBCockroach({ email }) {
    const result = await cockroach.query(
      "DELETE FROM users WHERE user_email_id = $1",
      [email]
    );

    return result;
  }

  async function updateUserDBCockroach({
    id,
    email,
    name,
    picturePath,
    accessToken,
    refreshToken,
    expiresIn,
  }) {
    let updateData = {};

    if (name) {
      updateData.name = name;
    }
    if (picturePath) {
      updateData.picture_path = picturePath;
    }
    if (accessToken) {
      updateData.access_token = accessToken;
    }
    if (expiresIn) {
      updateData.expires_in = expiresIn;
    }

    const result = await cockroach.query(
      `UPDATE users SET ("${Object.keys(updateData).join(
        '","'
      )}")=('${Object.values(updateData).join(
        "','"
      )}') WHERE user_email_id = '${email}'`
    );

    return result;
  }
  // ------------------------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------------------------
  // --------------------------------==================MYSQL====================----------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------------------------
  //MySQL Queries Functions

  async function getAllUserDB({ limit, offset }) {
    let query = "SELECT * FROM users";
    let args = [];
    if (limit) {
      query += " LIMIT ?";
      args.push(+limit);
    }
    if (offset) {
      query += " OFFSET ?";
      args.push(+offset);
    }

    const [rows, fields] = await mysql.query(query, args);

    return rows;
  }

  async function getUserByIdDB({ id }) {
    const [rows] = await mysql.query(
      "SELECT * FROM user WHERE Id = ?",
      [id],
      (err, data) => {
        console.log(data);
      }
    );
    // const {rows} = await cockroach.query("SELECT * FROM users WHERE id = $1", [
    // id,
    // ]);
    return rows;
  }
  async function getUserDB({ email }) {
    const [rows] = await mysql.query(
      "SELECT * FROM user WHERE userEmailId = ?",
      [email]
    );

    return rows;
  }

  async function addUserDB({ firstName, lastName, email }) {
    const accessToken = Math.random() * 100000;
    const refreshToken = Math.random() * 100000;
    const values = [firstName, lastName, email, accessToken, refreshToken];
    const result = await mysql.query(
      "INSERT INTO user(firstName,lastName,userEmailId,accessToken,refreshToken) VALUES(?,?,?,?,?)",
      values
    );

    return result;
  }

  async function deleteUserDB({ email }) {
    const result = await mysql.query("DELETE FROM user WHERE userEmailId = ?", [
      email,
    ]);

    return result;
  }

  async function updateUserDB({ email, firstName, lastName }) {
    let query = "UPDATE users SET ",
      args = [];
    if (firstName) {
      query += "first_name=? ";
      args.push(firstName);
    }
    if (lastName) {
      query += ",last_name=? ";
      args.push(lastName);
    }
    query += "WHERE user_email_id=?";
    args.push(email);

    const result = await cockroach.query(query, args);

    return result;
  }
}
module.exports = userDB;
