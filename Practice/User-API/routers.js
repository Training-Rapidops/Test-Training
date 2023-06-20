const express = require("express");
const router = express.Router();
const {
  addUser,
  deleteUser,
  getUser,
  getdata,
  updateUser,
  validateUserAndData,
  validateEmailAndUser,
  data,
  userData,
} = require("./middleware");

const port = 5000;

router
  .get("/api", (req, res) => {
    console.log("Redircting to Main Page");
    res.status(200).send("<h1>Welcome to User Database API<h1>");
  })
  .get("/user-data", getdata, (req, res) => {
    if (!userData) return res.status(404).send("Requested Data Not Found");
    console.log("showing User data");
    res.status("200").send(userData);
  })
  .get("/user/:email", getUser, (req, res) => {
    if (!userObj) return res.status(404).send("Requested User Not Found");
    console.log("showing Requested User");
    res.status(200).send(userObj);
  })
  .post("/adduser", validateUserAndData, addUser, (req, res) => {
    console.log("Adding new Data And Showing Data Storage");
    res.status(200).send(data);
  })
  .put("/updateuser/:email", validateEmailAndUser, updateUser, (req, res) => {
    console.log("Updating Requested User");
    res.status(200).send(data);
  })
  .delete(
    "/deleteuser/:email",
    validateEmailAndUser,
    deleteUser,
    (req, res) => {
      console.log("Deleting Requested user");
      res.status(200).send(data);
    }
  );
module.exports = router;
