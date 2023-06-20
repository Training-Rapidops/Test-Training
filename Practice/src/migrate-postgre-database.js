'use strict';
const fs= require('fs');
// Getting environment
let ENVIRONMENT = process.env.NODE_ENV;
if (ENVIRONMENT === '' || ENVIRONMENT === undefined) {
  ENVIRONMENT = 'development';
}
// Loading configuration
const CONFIG = require('./config');
const Sequelize = require('sequelize');
const ROOT_PATH = __dirname;// jshint ignore:line

let migrationPath = ROOT_PATH + '/migrations-postgre';
let database = CONFIG.cockroach.dbName || 'salesmate_dev';

if (process.env.Database && process.env.Database === 'default_values') {
  migrationPath = ROOT_PATH + '/migrations-postgre-for-default-values';
  database = CONFIG.cockroach.dbNameForDefaultValues;
}

doPostgreMigration();

async function doPostgreMigration() {
  try {
    const dialectOptions={
      multipleStatements: true,
      decimalNumbers: true,
    };

    if (CONFIG.cockroach.ssl) {
      dialectOptions.ssl = {
        ca: fs.readFileSync('/cockroach-certs/ca.crt')
            .toString(),
        key: fs.readFileSync('/cockroach-certs/client.root.key')
            .toString(),
        cert: fs.readFileSync('/cockroach-certs/client.root.crt')
            .toString(),
      };
    }

    const sequelize = new Sequelize(database, CONFIG.cockroach.username, CONFIG.cockroach.password, {
      dialect: 'postgresql',
      port: CONFIG.cockroach.port,
      host: CONFIG.cockroach.host,
      pool: {
        max: 10,
        min: 0,
        idle: 1000,
      },
      dialectOptions: dialectOptions,
      omitNull: false,
      logging: console.log, // logger.info
    });

    await sequelize.authenticate();
    const Umzug = require('umzug');

    const umzug = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize: sequelize,
      },
      migrations: {
        params: [sequelize.getQueryInterface(), sequelize.constructor, function() {
          throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug"' +
              ' and return a promise instead.');
        }],
        path: migrationPath,
        pattern: /\.js$/,
      },
    });

    await umzug.up();
    console.info('Postgre Migrations Completed.');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
