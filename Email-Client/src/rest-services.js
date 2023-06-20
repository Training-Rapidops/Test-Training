const express = require("express");
const router = express.Router();
const {
  getHomePage,
  getAllUserDataAction,
  getUserDataAction,
  addUserDataAction,
  deleteUserdataAction,
  updateUserDataAction,
  addLabelByNameAction,
  deleteLabelAction,
  updateLabelAction,
  addMailAction,
  sendMailAction,
} = require("./Controller");
// const addUser = controller.addUser;
// console.log(controller);
router
  .get("/", (req, res) => getHomePage(req, res))
  .get("/user-data", (req, res) => getAllUserDataAction(req, res))
  .get("/user/:email", (req, res) => getUserDataAction(req, res))
  .post("/adduser", (req, res) => addUserDataAction(req, res))
  .put("/updateuser/:id", (req, res) => updateUserDataAction(req, res))
  .delete("/deleteuser/:email", (req, res) => deleteUserdataAction(req, res))
  .post("/addlabel/:id", (req, res) => addLabelByNameAction(req, res))
  .delete("/deletelabel/:id/:label", (req, res) => deleteLabelAction(req, res))
  .put("/updatelabel/:id/:label", (req, res) => updateLabelAction(req, res))
  .post("/addmail", (req, res) => addMailAction(req, res))
  .post("/sendmail/:id", (req, res) => sendMailAction(req, res));

module.exports = router;
