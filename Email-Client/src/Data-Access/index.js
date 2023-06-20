const mysql2 = require("mysql2");
const config = require("../config/development");
const { Pool } = require("pg");
const userTable = require("./user-table");
const lableTable = require("./label-table");
const emailTable = require("./emiail-table");
const attachmentTable = require("./attachment-table");
const recipientsTable = require("./recipients-table");
const emailFolderAssociationTable = require("./email-folder-association-table");

const mysql = mysql2
  .createPool({
    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database,
  })
  .promise();

const cockroach = new Pool({
  user: "root",
  host: "127.0.0.1",
  database: "test11",
  password: "root",
  port: config.cockroach.port,
  // dialectOptions: config.cockroach.dialectOptions,
  ssl: config.cockroach.dialectOptions.ssl,
});

const userDB = userTable({
  mysql,
  cockroach,
});
const labelDB = lableTable({ mysql, cockroach });
const emailDB = emailTable({ mysql, cockroach });
const attachmentDB = attachmentTable({ mysql, cockroach });
const recipientDB = recipientsTable({ mysql, cockroach });
const emailFolderAssociationDB = emailFolderAssociationTable({
  mysql,
  cockroach,
});

module.exports = {
  userDB,
  labelDB,
  emailDB,
  attachmentDB,
  recipientDB,
  emailFolderAssociationDB,
};
