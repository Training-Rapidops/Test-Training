const CONFIG = require("./config/development");
const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");

const database = "test11",
  user = "root",
  password = "root";

const sequelize = new Sequelize(database, user, password, {
  dialect: "postgres",
  port: CONFIG.cockroach.port,
  host: CONFIG.cockroach.host,
  dialectOptions: CONFIG.cockroach.dialectOptions,
  logger: console,
});

const umzug = new Umzug({
  migrations: {
    glob: `migration-for-cockroach/*.js`,
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
