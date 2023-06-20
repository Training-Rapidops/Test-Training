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
    database: "employee",
    host: "127.0.0.1",
    port: 26257,
    dialect: "postgres",
  },
  kafka: {
    host: "127.0.0.1",
    port: 9092,
    brokerList: ["localhost:9092"],
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
