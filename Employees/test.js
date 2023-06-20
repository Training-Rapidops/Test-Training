let updateArray = [
  { id: 1, name: "SAFI" },
  { id: 2, name: "Deep", email: "deeep.patel@mail.com" },
  { id: 3, email: "Malhar@mail.com" },
];

let idArray = [],
  updateDataObj = {};
updateArray.forEach((val) => {
  idArray.push(val.id);

  let col = Object.keys(val);
  let data = Object.values(val);

  for (let i = 0; i < col.length; i++) {
    if (col[i] !== "id") {
      updateDataObj[col[i]] = updateDataObj[col[i]]
        ? updateDataObj[col[i]]
        : [];
      updateDataObj[col[i]].push([val.id, data[i]]);
    }
  }
});
console.log(updateDataObj, idArray);

let query = `UPDATE token_table SET`;

let keys = Object.keys(updateDataObj);

keys.forEach((key) => {
  query += ` ${key} = CASE `;

  let i = 0;
  updateDataObj[key].forEach((val) => {
    query += ` WHEN id = '${val[i]}' THEN '${val[i + 1]}'`;
  });

  query += ` ELSE ${key} END,`;
});

query = query.substring(0, query.length - 1);

query += ` WHERE id IN ('${idArray.join("','")}')`;

console.log(query);

// camelCaseString.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
