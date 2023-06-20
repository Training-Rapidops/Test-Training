module.exports = function makeUpdateMultipleEmployees({
  Joi,
  employeeDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function updateMultipleEmployees({ updateData }) {
    try {
      updateData = validateData({ updateData });

      let idArray = [],
        updateDataObj = {};
      updateData.forEach((val) => {
        idArray.push(val.id);

        let columnName = Object.keys(val);
        let columnData = Object.values(val);

        for (let i = 0; i < columnName.length; i++) {
          if (columnName[i] !== "id") {
            updateDataObj[columnName[i]] = updateDataObj[columnName[i]]
              ? updateDataObj[columnName[i]]
              : [];
            updateDataObj[columnName[i]].push([val.id, columnData[i]]);
          }
        }
      });
      const result = await employeeDB.updateMultipleEmployeesDB({
        updateDataObj,
        idArray,
      });

      const affectedRows = result.rowCount;
      if (affectedRows > 0) {
        return { affectedRows };
      } else {
        throw new NoDataFoundError(`No employees found with given ids`);
      }
    } catch (err) {
      // if (err.hasOwnProperty("detail")) {
      //   throw new DBError(err.message);
      // }
      throw err;
    }
  };

  function validateData({ updateData }) {
    const schema = Joi.array()
      .items(
        Joi.object()
          .keys({
            id: Joi.string().guid().trim().required(),
            employeeName: Joi.string().min(3).trim().optional(),
            employeeEmail: Joi.string().email().trim().optional(),
            employeeAddress: Joi.string().min(5).trim().optional(),
            employeeRole: Joi.string().min(3).trim().optional(),
            isVarified: Joi.boolean().optional(),
          })
          .or(
            "employeeName",
            "employeeEmail",
            "employeeAddress",
            "employeeRole",
            "isVarified"
          )
      )
      .min(1)
      .required();

    const { value, error } = schema.validate(updateData);
    if (error) {
      throw new ValidationError(error.message);
    }
    return value;
  }
};
