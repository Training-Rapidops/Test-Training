function labelDB({ cockroach, mysql }) {
  return {
    getLabelByIdDB,
    addLabelFolderDB,
    addLabelByNameDB,
    deleteLabelDB,
    updateLabelDB,
    getLabelByIdDBCockroach,
    getLabelByNameCockroach,
    getLabelInAscOrder,
    addLabelFolderDBCockroach,
    addLabelByNameDBCockroach,
    deleteLabelDBCockroach,
    updateLabelDBCockroach,
    // updateSyncedFolderId,
  };

  async function getLabelByIdDBCockroach({ id }) {
    const { rows } = await cockroach.query(
      "SELECT * FROM label WHERE user_id = $1",
      [id]
    );

    return rows;
  }
  async function getLabelByNameCockroach({ labelName, userId }) {
    const { rows } = await cockroach.query(
      "SELECT * FROM label WHERE label_name = $1 AND user_id = $2",
      [labelName, userId]
    );

    return rows;
  }
  async function getLabelInAscOrder({ id }) {
    const { rows } = await cockroach.query(
      "SELECT * FROM label WHERE user_id = $1 AND fetched = $2 ORDER BY priority ASC",
      [id, "f"]
    );

    return rows;
  }

  async function addLabelFolderDBCockroach({ insertId, label }) {
    const syncedFolderId = Math.random() * 10000000;
    const values = [label, insertId, syncedFolderId];

    await cockroach.query(
      "INSERT INTO label(label_name,user_id,synced_folder_id) VALUES($1,$2,$3)",
      values
    );

    return;
  }

  async function addLabelByNameDBCockroach({
    id,
    label,
    syncedFolderId,
    priority,
  }) {
    // const syncedFolderId = Math.random() * 10000000;
    const values = [label, id, syncedFolderId, priority];
    console.log(label, id, syncedFolderId, priority, "[[[[[[[[[[[[[[[[[[[[[[");

    const result = await cockroach.query(
      "INSERT INTO label(label_name,user_id,synced_folder_id,priority) VALUES($1,$2,$3,$4)",
      values
    );

    return result;
  }

  async function deleteLabelDBCockroach({ id, label }) {
    const result = await cockroach.query(
      "DELETE FROM label WHERE user_id = $1 AND label_name = $2",
      [id, label]
    );

    return result;
  }

  // async function updateLabelDBCockroach({ id, label, newLabel }) {
  //   const result = await cockroach.query(
  //     "UPDATE label SET label_name = $1 WHERE user_id = $2 AND label_name = $3",
  //     [newLabel, id, label]
  //   );

  //   return result;
  // }

  async function updateLabelDBCockroach({
    id,
    label,
    newLabel,
    syncedFolderId,
    priority,
    isFetched,
    nextPageToken,
  }) {
    let updateData = {};
    if (newLabel) {
      updateData.label_name = newLabel;
    }
    if (syncedFolderId) {
      updateData.synced_folder_id = syncedFolderId;
    }
    if (priority) {
      updateData.priority = priority;
    }
    if (isFetched) {
      updateData.fetched = isFetched;
    }
    if (nextPageToken) {
      updateData.next_page_token = nextPageToken;
    }

    if (Object.keys(updateData).length) {
      const result = await cockroach.query(
        `UPDATE label SET("${Object.keys(updateData).join(
          '","'
        )}")=('${Object.values(updateData).join(
          "','"
        )}') WHERE user_id='${id}' AND label_name='${label}'`
      );
      priority++;
      return { priority };
    }
  }

  //MySQL Queries Functions

  async function getLabelByIdDB({ id }) {
    const { rows } = await mysql.query("SELECT * FROM label WHERE userId = ?", [
      id,
    ]);

    return rows;
  }

  async function addLabelFolderDB({ insertId, label }) {
    const syncedFolderId = Math.random() * 10000000;
    const values = [label, insertId, syncedFolderId];
    await mysql.query(
      "INSERT INTO label(labelName,userId,syncedFolderId) VALUES(?,?,?)",
      values
    );

    return;
  }

  async function addLabelByNameDB({ id, label }) {
    const syncedFolderId = Math.random() * 10000000;

    const values = [label, id, syncedFolderId];
    const result = await mysql.query(
      "INSERT INTO label(label_name,user_id,synced_folder_id) VALUES(?,?,?)",
      values
    );
    // const result = await cockroach.query(
    //   "INSERT INTO label(label_name,user_id,synced_folder_id) VALUES($1,$2,$3)",
    //   values
    // );
    return result;
  }

  async function deleteLabelDB({ id, label }) {
    const result = await mysql.query(
      "DELETE FROM label WHERE user_id = ? AND label_name = ?",
      [id, label]
    );

    return result;
  }

  async function updateLabelDB({ id, label, newLabel }) {
    const result = await mysql.query(
      "UPDATE label SET label_name = ? WHERE user_id = ? AND label_name = ?",
      [newLabel, id, label]
    );

    return result;
  }
}
module.exports = labelDB;
