const api_enums = {
  employee_create: "post:/employee/addemployee",
  employee_read: "get:/employee/getemployee/:id",
  employee_update: "patch:/employee/updateemployee/:id",
  employee_delete: "delete:/employee/deleteemployee/:id",
  employee_varify: "get:/employee/varifyemployee/:email",

  session_by_employee_read: "get:/employee/getallsessions/:employeeId",
  session_by_Employee_craete: "post:/employee/loginemployee",
  session_by_employee_delete: "post:/employee/deletesession/:employeeId",

  profile_photo_read: "get:/employee/downloadprofilephoto/",

  all_employees_read: "get:/employee/getallemployees",
  all_employees_by_company_read:
    "get:/employee/getallemployeesbycompany/:companyId",
  all_employees_by_company_delete:
    "delete:/employee/deleteemployeesbycompany/:companyId",
  all_employees_update: "patch:/employee/updatemultipleemployees",
};

module.exports = { api_enums };
