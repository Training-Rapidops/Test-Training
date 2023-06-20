const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const {
  addEmployeeAction,
  loginEmployeeAction,
  getEmployeeAction,
  getAllEmployeesAction,
  getAllEmployeeByCompanyAction,
  getAllSessionsAction,
  varifyEmployeeAction,
  updateEmployeeAction,
  deleteEmployeeAction,
  deleteEmployeesByCompanyAction,
  deleteSessionAction,
  updateMultipleEmployeesAction,
  downloadProfilePhotoAction,
  addPermissionsAction,
} = require("./controller");
router
  .post("/addemployee", upload.any(), (req, res) => addEmployeeAction(req, res))
  .get("/getemployee/:id", (req, res) => getEmployeeAction(req, res))
  .delete("/deleteemployee/:id", (req, res) => deleteEmployeeAction(req, res))
  .patch("/updateemployee/:id", (req, res) => updateEmployeeAction(req, res))
  .post("/loginemployee", (req, res) => loginEmployeeAction(req, res))
  .get("/varifyemployee/:email", (req, res) => varifyEmployeeAction(req, res))
  .get("/getallemployees", (req, res) => getAllEmployeesAction(req, res))
  .get("/getallemployeesbycompany/:companyId", (req, res) =>
    getAllEmployeeByCompanyAction(req, res)
  )
  .delete("/deleteemployeesbycompany/:companyId", (req, res) =>
    deleteEmployeesByCompanyAction(req, res)
  )
  .patch("/updatemultipleemployees", (req, res) =>
    updateMultipleEmployeesAction(req, res)
  )
  .get("/getallsessions/:employeeId", (req, res) =>
    getAllSessionsAction(req, res)
  )
  .post("/deletesession/:employeeId", (req, res) =>
    deleteSessionAction(req, res)
  )
  .get("/downloadprofilephoto/:id", (req, res) =>
    downloadProfilePhotoAction(req, res)
  )
  .post("/addpermission", (req, res) => addPermissionsAction(req, res));

module.exports = router;
