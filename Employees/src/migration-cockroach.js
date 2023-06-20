const CONFIG = require("./config");
const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");

const database = CONFIG.cockroach.database,
  user = CONFIG.cockroach.username,
  password = "root";

const sequelize = new Sequelize(database, user, password, {
  dialect: CONFIG.cockroach.dialect,
  port: CONFIG.cockroach.port,
  host: CONFIG.cockroach.host,
  // dialectOptions: CONFIG.cockroach.dialectOptions,
  logger: console,
});

const umzug = new Umzug({
  migrations: {
    glob: `src/migrations/*.js`,
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  await sequelize.authenticate();

  await umzug.up();
})();
// module.exports = { doCockroachMigration };
