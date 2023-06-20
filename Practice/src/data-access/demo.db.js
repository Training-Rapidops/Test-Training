const DEMO_TABLE_NAME = 'demo_table'

function makeDemoDb({mysql}) {
  return Object.freeze({
    createDemoEntry,
  });

  async function createDemoEntry({appName, hostname}) {
    const [result] = await mysql.executeQuery({
      useProxyConnection: true,
      query: `INSERT INTO ${DEMO_TABLE_NAME}(name) values (?)`,
      values: [appName],
      hostname,
    });
    return result;
  }
}

module.exports = makeDemoDb;
