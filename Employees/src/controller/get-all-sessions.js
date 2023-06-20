module.exports = function makeGetAllSessionsAction({
  Joi,
  getAllSessions,
  ValidationError,
}) {
  return async function getAllSessionsAction(req, res) {
    try {
      const { employeeId } = req.params;
      let { sortBy, filterBy } = req.query;

      validateData({ employeeId, sortBy, filterBy });

      if (filterBy) {
        filterBy = filterBy.split(" ");
      }

      const getAllSesionsDetails = await getAllSessions({
        employeeId,
        sortBy,
        filterBy,
      });

      res.status(200).json({ status: "success", body: getAllSesionsDetails });
    } catch (err) {
      console.log(err);
      res.status(err.httpStatusCode || 500).json({
        status: "error",
        name: err.name,
        message: err.message,
        date: err.date,
      });
    }
  };

  function validateData({ employeeId, sortBy, filterBy }) {
    const schema = Joi.object().keys({
      employeeId: Joi.string().guid().required(),
      sortBy: Joi.string().optional(),

      filterBy: Joi.string().optional(),
    });

    const { value, error } = schema.validate({
      employeeId,
      sortBy,
      filterBy,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
