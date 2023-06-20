const fs = require("fs");
config = {
  mysql: {
    username: "root",
    password: "21@32001",
    database: "User",
    host: "127.0.0.1",
    dialect: "mysql",
  },

  cockroach: {
    username: "root",
    password: "root",
    database: "test11",
    host: "127.0.0.1",
    port: 26257,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        ca: fs
          .readFileSync("/home/ad.rapidops.com/safi.shaikh/certs/ca.crt")
          .toString(),
        key: fs
          .readFileSync(
            "/home/ad.rapidops.com/safi.shaikh/certs/client.root.key"
          )
          .toString(),
        cert: fs
          .readFileSync(
            "/home/ad.rapidops.com/safi.shaikh/certs/client.root.crt"
          )
          .toString(),
      },
    },
  },

  kafka: {
    host: "127.0.0.1",
    port: 9092,
    brokerList: "localhost:9091",
  },
};
module.exports = config;
