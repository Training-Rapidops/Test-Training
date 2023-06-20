const config = require("../config");
const { Pool } = require("pg");
const { DBError } = require("../exceptions");
const companyTable = require("./company-table");

const cockroach = new Pool({
  user: config.cockroach.username,
  host: config.cockroach.host,
  database: config.cockroach.database,
  password: config.cockroach.password,
  port: config.cockroach.port,
  // ssl: config.cockroach.dialectOptions.ssl,
});

const companyDB = companyTable({ cockroach, DBError });

module.exports = Object.freeze({
  companyDB,
});
