module.exports = function makeLabelTemplet({ Joi }) {
  return function labelTemplet({
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
      priority: Joi.number().integer(),
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
        error: "Validation error",
        message: error.details[0].message,
      };
    }
    return Object.freeze({
      getId: () => value.id,
      getLabel: () => value.label,
      getNewLabel: () => value.newLabel,
      getsyncedFolderId: () => value.syncedFolderId,
      getPriority: () => value.priority,
      getIsFetched: () => value.isFetched,
      getNextPageToken: () => value.nextPageToken,
    });
  };
};
