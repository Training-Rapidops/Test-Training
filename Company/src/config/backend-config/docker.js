const fs = require("fs");
config = {
  mysql: {
    username: "root",
    password: "21@32001",
    database: "User",
    host: "mysqldb",
    dialect: "mysql",
  },

  cockroach: {
    username: "root",
    password: "root",
    database: "company",
    host: "cockroachdb",
    port: 26257,
    dialect: "postgres",
    // dialectOptions: {
    //   ssl: {
    //     ca: fs
    //       .readFileSync("/home/ad.rapidops.com/safi.shaikh/certs/ca.crt")
    //       .toString(),
    //     key: fs
    //       .readFileSync(
    //         "/home/ad.rapidops.com/safi.shaikh/certs/client.root.key"
    //       )
    //       .toString(),
    //     cert: fs
    //       .readFileSync(
    //         "/home/ad.rapidops.com/safi.shaikh/certs/client.root.crt"
    //       )
    //       .toString(),
    //   },
    // },
  },
  kafka: {
    host: "kafka",
    port: 9092,
    brokerList: ["kafka:9092"],
  },
};
module.exports = config;
