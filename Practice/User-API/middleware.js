const express = require("express");
const fs = require("fs");
const url = require("url");
const Joi = require("joi");
const app = express();
const port = 5000;
const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const dataFile = fs.readFileSync("user.json", "utf-8");
const data = JSON.parse(fs.readFileSync("user.json", "utf-8"));
const schema = Joi.object().keys({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().regex(pattern).required(),
});
const userObj = {};
let userData = [],
  firstName,
  lastName,
  email;

app.use(express.json());
// Get All USer Data
function getdata(req, res, next) {
  console.log("Started To get requested data");
  data.forEach((e) => {
    let valObj = {};
    valObj.firstName = e.firstName;
    valObj.lastName = e.lastName;
    valObj.email = e.email;
    userData.push(valObj);
  });
  next();
}
// get Spacified User Data
function getUser(req, res, next) {
  console.log("Started To get requested User");
  const userValue = data.find((u) => u.email === req.params.email);
  userObj.firstName = userValue.firstName;
  userObj.lastName = userValue.lastName;
  userObj.email = userValue.email;
  next();
}

// Add User
function addUser(req, res, next) {
  console.log("started Adding given User");
  let userValueObj = {},
    idArr = [];
  data.forEach((val) => idArr.push(val.id.slice(3)));
  maxID = Math.max(...idArr) + 1;
  userValueObj.id = "xxx" + maxID;
  userValueObj.firstName = firstName;
  userValueObj.lastName = lastName;
  userValueObj.email = email;
  userValueObj.accessToken = "";
  userValueObj.refreshToken = "";
  data.push(userValueObj);
  fs.writeFileSync("user.json", JSON.stringify(data), "utf-8");
  next();
}
// Update User
function updateUser(req, res, next) {
  console.log("Started To update Given User Details");
  let index = data.indexOf(data.find((val) => val.email === userMail));
  data[index].firstName = req.body.firstName || data[index].firstName;
  data[index].lastName = req.body.lastName || data[index].lastName;
  fs.writeFileSync("user.json", JSON.stringify(data), "utf-8");
  next();
}
// Delete User
function deleteUser(req, res, next) {
  console.log("Started To delete Given User");
  data.splice(data.indexOf(data.find((val) => val.email === userMail)), 1);
  fs.writeFileSync("user.json", JSON.stringify(data), "utf-8");
  next();
}
// validate given user Data
function validateUserAndData(req, res, next) {
  console.log("validating requested user");
  if (!req.body) return res.status(403).send("Error: Missing Values");
  const userValues = req.body;
  firstName = userValues.firstName.trim();
  lastName = userValues.lastName.trim();
  email = userValues.email.trim();
  let result = schema.validate(req.body);
  // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (result.error)
    return res.status(403).send("Error: " + result.error.details[0].message);
  else if (data.find((e) => e.email === email))
    return res.status(409).send("<h2>USer Alredy Exists</h2>");
  else next();
}

// Validate Given Mail and User
function validateEmailAndUser(req, res, next) {
  console.log("Validating Given mail Address");
  userMail = req.params.email.trim();
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userMail))
    return res.status(400).send("<h2>Invalid Email format</h2>");
  else if (!data.find((val) => val.email === userMail))
    return res.status(404).send("<h2>Requested User Not Found</h2>");
  next();
}

module.exports = {
  addUser,
  deleteUser,
  getUser,
  getdata,
  updateUser,
  validateUserAndData,
  validateEmailAndUser,
  data,
  userData,
};
