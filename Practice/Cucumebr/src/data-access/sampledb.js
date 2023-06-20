function makeSampleDb({mysql, cockroach}) {
  return Object.freeze({
    findAll,
    findAllCockroachDb,
  });

  async function findAll({connection, hostname}) {
    if (!connection) {
      connection = await mysql.getMasterNodeConnection(hostname);
    }
    return connection.query('SELECT 1;');
  }

  async function findAllCockroachDb({hostname}) {
    const [result] = cockroach.executeQuery({
      hostname,
      query: 'select 1;',
    });
    return result;
  }
}

module.exports = makeSampleDb;
