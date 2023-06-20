module.exports = function makeFetchAndAddGmailLabels({
  Joi,
  fetchLabels,
  addLabelByName,
}) {
  return async function fetchAndAddGmailLabels({ userData }) {
    const labels = await fetchLabels({
      userMail: userData.email,
      accessToken: userData.access_token,
    });
    const id = userData.id;
    for (let i = 0; i < labels.length || 0; i++) {
      let label = labels[i].name;
      let syncedFolderId = labels[i].id;

      const result = await addLabelByName({
        id,
        label,
        syncedFolderId,
      });
    }
  };
};
