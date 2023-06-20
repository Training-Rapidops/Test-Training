module.exports = function makeGetAllSessions({
  Joi,
  tokenDB,
  ValidationError,
  DBError,
  NoDataFoundError,
}) {
  return async function getAllSessions({ employeeId, sortBy, filterBy }) {
    try {
      let value = validateData({ employeeId, sortBy, filterBy });
      ({ employeeId, sortBy, filterBy } = value);

      const result = await tokenDB.getAllSessionsDB({
        employeeId,
        sortBy,
        filterBy,
      });
      if (result.length > 0) {
        return result;
      } else {
        throw new NoDataFoundError("No Data Found");
      }
    } catch (err) {
      // if (err.hasOwnProperty("detail")) {
      //   throw new DBError(err.message);
      // }
      throw err;
    }
  };

  function validateData({ employeeId, sortBy, filterBy }) {
    const schema = Joi.object().keys({
      employeeId: Joi.string().guid().required(),
      sortBy: Joi.string()
        .trim()
        .regex(/^[a-z]+(?:[A-Z][a-z]*)*$/)
        .optional()
        .error((err) => {
          return new ValidationError(
            `"sortBy" property must be in "columnName" format`
          );
        }),
      filterBy: Joi.array().items(
        Joi.string()
          .trim()
          .pattern(/^[a-z]+(?:[A-Z][a-z]*)*(?=:)/)
          .error((err) => {
            return new ValidationError(
              `"filterBy" property must be in "columnName:value" format`
            );
          })
      ),
    });

    const { value, error } = schema.validate({
      employeeId,
      sortBy,

      filterBy,
    });

    if (error) {
      throw new ValidationError(error.message);
    }

    return value;
  }
};

// [

// {
//   "id": "1847ecff-5622-4698-8663-9249cbeee00f",
//   "employee_id": "9c08d1d2-322f-4b95-b43b-184a594027c3",
//   "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3MzUyMzF9.MJywdpzjqXBXXnA-TVp6P9-D66SQVv1JaKpoEmaSP88",
//   "expire_time": "1686303335232",
//   "browser": "postman",
//   "device": "linux",
//   "ip_address": "2a01:e35:8bd9:8bb0:92b:8628:5ca5:5f2b",
//   "location": "bagneux, fr, idf",
//   "createdAt": "2023-06-09T14:05:35.232Z",
//   "updatedAt": "2023-06-09T14:05:35.232Z"
// },
//   {
//       "id": "362046a1-243b-433e-bcfd-e2eba2cc6cf2",
//       "employee_id": "9c08d1d2-322f-4b95-b43b-184a594027c3",
//       "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzA4ZDFkMi0zMjJmLTRiOTUtYjQzYi0xODRhNTk0MDI3YzMiLCJpYXQiOjE2ODYyOTk3MjY4Mzl9.MoT2wjQPohJdWxeQUGm1ztJlisGui4xuEX5mdUHbGS8",
//       "expire_time": "1686303326840",
//       "browser": "postman",
//       "device": "linux",
//       "ip_address": "103.238.107.135",
//       "location": "ahmedabad, in, gj",
//       "createdAt": "2023-06-09T14:05:26.840Z",
//       "updatedAt": "2023-06-09T14:05:26.840Z"
//   },
// ]
