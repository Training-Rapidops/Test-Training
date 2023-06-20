const express = require("express");
const bodyParser = require("body-parser");
const router = require("./rest-services");
const app = express();
// const cors = require("cors");
const PORT = 6000;

app.use(express.json());
app.use("/company", router);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

// // "cors": "^2.8.5",
// "express": "^4.18.2",
// "joi": "^17.9.2",
// "kafkajs": "^2.2.4",
// "node-fetch": "^2.6.11",
// "pg": "^8.11.0",
// "sequelize": "^6.31.1",
// "umzug"
