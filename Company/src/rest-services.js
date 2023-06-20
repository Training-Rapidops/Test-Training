const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const {
  addCompanyAction,
  getCompanyAction,
  getCompanyByNameAction,
  getAllCompanyAction,
  updateCompanyAction,
  deleteCompanyAction,
} = require("./controller");

router
  .post("/addcompany", upload.any(), (req, res) => addCompanyAction(req, res))
  .get("/getcompany/:id", (req, res) => getCompanyAction(req, res))
  .get("/getcompanybyname/:name", (req, res) =>
    getCompanyByNameAction(req, res)
  )
  .get("/getallcompany", (req, res) => getAllCompanyAction(req, res))
  .patch("/updatecompany/:id", (req, res) => updateCompanyAction(req, res))
  .delete("/deletecompany/:id", (req, res) => deleteCompanyAction(req, res));

module.exports = router;
