module.exports = function getAllUsers({ userDB, getLabel }) {
  return async function allUserDetailsUsecase(
    { limit, offset } = { limit: undefined, offset: 0 }
  ) {
    // console.log(limit, offset);
    const result = await userDB.getAllUserDBCockroach({ limit, offset });

    for (let i = 0; i < result.length; i++) {
      const userId = result[i].id;

      const label = await getLabel({ userId });
      const labelData = [];
      label.forEach((label) => {
        labelData.push(label.label_name);
      });

      result[i].labels = labelData;
    }
    return result;
  };
};
