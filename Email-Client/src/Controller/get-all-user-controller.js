module.exports = function makeGetAllUserAction({ allUserDetailsUsecase }) {
  return async function getAllUserDataAction(req, res) {
    try {
      if (req.query.admin) {
        const offset = req.query.offset;
        const limit = req.query.limit;
        const userData = await allUserDetailsUsecase({ limit, offset });

        res.status(200).send(userData);
      } else res.status(401).send("Not Authorised");
    } catch (err) {
      const error = err.message || err.detail;
      console.log(err);
      res.status(404).send(error);
    }
  };
};
