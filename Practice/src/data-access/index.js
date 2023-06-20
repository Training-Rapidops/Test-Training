const config = require('../config');
const MySQLUtil = require('utilities').MySQLUtil;
const CockroachDBUtil = require('utilities').CockroachDBUtil;
const mysql = new MySQLUtil({
  masterHost: config.mysql.hostForReadWrite,
  masterPort: config.mysql.portForReadWrite,
  proxyHost: config.mysql.host,
  proxyPort: config.mysql.port,
  username: config.mysql.username,
  password: config.mysql.password,
  waitForConnections: true,
  masterPoolSize: config.mysql.poolSize,
  proxyPoolSize: config.mysql.poolSize,
});

const cockroach = new CockroachDBUtil({
  username: config.cockroach.username,
  host: config.cockroach.host,
  database: config.cockroach.dbName,
  password: config.cockroach.password,
  port: config.cockroach.port,
  poolSize: config.cockroach.poolSize,
  isSSL: config.cockroach.ssl,
});

// Make all DBs here
const makeSampleDb = require('./sampledb');
const sampleDb = makeSampleDb({mysql, cockroach});

const makeDemoDb = require('./demo.db');
const demoDb = makeDemoDb({mysql, cockroach});

// Export all DBs
const dbs = {
  sampleDb,
  demoDb,
};
module.exports = {mysql, cockroach, ...dbs};
