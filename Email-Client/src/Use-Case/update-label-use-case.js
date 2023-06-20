module.exports = function makeUpdateLabelUseCase({
  Joi,
  userDB,
  labelDB,
  labelTemplet,
}) {
  return async function updateLabel({
    id,
    label,
    newLabel,
    syncedFolderId,
    priority,
    isFetched,
    nextPageToken,
  }) {
    validateData({
      id,
      label,
      newLabel,
      syncedFolderId,
      priority,
      isFetched,
      nextPageToken,
    });

    await checkExistingUser({ id });

    await checkExistingLabel({ id, newLabel });

    const labelValue = labelTemplet({
      id,
      label,
      newLabel,
      syncedFolderId,
      priority,
      isFetched,
      nextPageToken,
    });
    const idValue = labelValue.getId();
    const labelNameValue = labelValue.getLabel();
    const newLabelValue = labelValue.getNewLabel();
    const syncedFolderIdValue = labelValue.getsyncedFolderId();
    const priorityValue = labelValue.getPriority();
    const isFetchedValue = labelValue.getIsFetched();
    const nextPageTokenValue = labelValue.getNextPageToken();

    const result = await labelDB.updateLabelDBCockroach({
      id: idValue,
      label: labelNameValue,
      newLabel: newLabelValue,
      syncedFolderId: syncedFolderIdValue,
      priority: priorityValue,
      isFetched: isFetchedValue,
      nextPageToken: nextPageTokenValue,
    });
    const affectedRows =
      result.rowCount == undefined ? result.affectedRows : result.rowCount;
    if (affectedRows === 0) {
      throw {
        error: "Not Found",
        message: `No Such Label named "${label}" Found`,
      };
    }
    return affectedRows;
  };
  function validateData({
    id,
    label,
    newLabel,
    syncedFolderId,
    priority,
    isFetched,
    nextPageToken,
  }) {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      label: Joi.string().min(3).required(),
      newLabel: Joi.string().min(3),
      syncedFolderId: Joi.string(),
      priority: Joi.string(),
      isFetched: Joi.string().min(1).max(2),
      nextPageToken: Joi.string(),
    });

    const { value, error } = schema.validate({
      id,
      label,
      newLabel,
      syncedFolderId,
      priority,
      isFetched,
      nextPageToken,
    });
    if (error) {
      throw {
        error: "Validation Error",
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
  async function checkExistingLabel({ id, newLabel }) {
    const result = await labelDB.getLabelByIdDBCockroach({ id });

    let count = 0;
    result.forEach((lab) => {
      if (lab.label_name === newLabel) {
        count++;
      }
    });
    if (count > 0)
      throw {
        error: "Forbidden Error",
        message: "Label already exists",
      };
    return;
  }
};
