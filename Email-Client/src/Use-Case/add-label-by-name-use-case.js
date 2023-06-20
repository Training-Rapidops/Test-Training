module.exports = function makeAddLabelByName({
  Joi,
  userDB,
  labelDB,
  labelTemplet,
}) {
  return async function addLabelByName({ id, label, syncedFolderId }) {
    validateData({ id, label, syncedFolderId });

    await checkExistingUser({ id });
    const isLabelExists = await checkExistingLabel({ id, label });
    if (!isLabelExists.isExists) {
      const labelValues = labelTemplet({ id, label, syncedFolderId });
      const idValue = labelValues.getId();
      const labelValue = labelValues.getLabel();
      const syncedFolderIdValue = labelValues.getsyncedFolderId();

      const result = await labelDB.addLabelByNameDBCockroach({
        id: idValue,
        label: labelValue,
        syncedFolderId: syncedFolderIdValue,
        priority: isLabelExists.priority,
      });
      const affectedRows =
        result.rowCount == undefined ? result.affectedRows : result.rowCount;
      return result;
    } else {
      const result = await labelDB.updateLabelDBCockroach({
        id,
        label,
        syncedFolderId,
      });
      const affectedRows =
        result.rowCount == undefined ? result.affectedRows : result.rowCount;
      return affectedRows;
    }
  };
  function validateData({ id, label, syncedFolderId }) {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      label: Joi.string().min(3).required(),
      syncedFolderId: Joi.string().required(),
    });

    const { value, error } = schema.validate({
      id,
      label,
      syncedFolderId,
    });
    if (error) {
      throw {
        error: "Validation error",
        message: error.details[0].message,
      };
    }

    return;
  }
  async function checkExistingUser({ id }) {
    const result = await userDB.getUserByIdDBCockroach({ id });

    if (result.length === 0) {
      throw { error: "Forbidden Error", message: "User does not exists" };
    }

    return;
  }
  async function checkExistingLabel({ id, label }) {
    const result = await labelDB.getLabelByIdDBCockroach({ id });

    let count = 0;
    result.forEach((lab) => {
      if (lab.label_name === label) {
        count++;
      }
    });
    if (count > 0) return { isExists: true };
    return { isExists: false, priority: result.length + 1 };
  }
};
