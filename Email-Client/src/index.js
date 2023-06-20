const express = require("express");
const router = require("./rest-services");
const app = express();
const cors = require("cors");
const port = 3000;
console.log(port);
// const doPostgre = require("./migration-cockroach");
const { addFolderConsumer, addMailsConsumer } = require("./handlers");
addFolderConsumer();
addMailsConsumer();

const { updateAccessTokenCron } = require("./crons");
updateAccessTokenCron();

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(port, () => {
  console.log("Listening on port" + port);
});

//
// user by id only
// this
// duplicate email
// promises

//local history

// any change in use case should break the log
//exit point = scenario
