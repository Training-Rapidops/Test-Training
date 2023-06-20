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
    database: "employee",
    host: "cockroachdb",
    port: 26257,
    dialect: "postgres",
  },
  kafka: {
    host: "kafka",
    port: 9092,
    brokerList: ["kafka:9092"],
  },
  Oauth: {
    secretkey: "abcdefghijklmnop123456",
  },
  gcpStorage: {
    projectId: "experro-dev",
    bucketName: "experro-dev",
    keyFilename: "src/config/gcp-keys/gcp-service-account-key.json",
    folderName: "trainee-data/safishaikh",
  },
};
module.exports = config;
