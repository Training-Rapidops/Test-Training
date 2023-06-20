const config = require("../config");
const { Pool } = require("pg");
const { DBError } = require("../exceptions");
const employeeTable = require("./employee-table");
const tokenTable = require("./token-table.js");
const permissionTable = require("./permission-table");
const userRoleAssociationTable = require("./user-role-association-table");

const cockroach = new Pool({
  user: config.cockroach.username,
  host: config.cockroach.host,
  database: config.cockroach.database,
  password: config.cockroach.password,
  port: config.cockroach.port,
  // ssl: config.cockroach.dialectOptions.ssl,
});

const employeeDB = employeeTable({ cockroach, DBError });
const tokenDB = tokenTable({ cockroach, DBError });
const permissionDB = permissionTable({ cockroach, DBError });
const userRoleAssociationDB = userRoleAssociationTable({ cockroach, DBError });

module.exports = Object.freeze({
  employeeDB,
  tokenDB,
  permissionDB,
  userRoleAssociationDB,
});
