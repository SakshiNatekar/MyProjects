const {Connection, Request} = require("tedious");
const executeSQL = (sql, callback) => {
  let connection = new Connection({
    "authentication": {
      "options": {
        "userName": "sa",
        "password": "sa"
      },
      "type": "default"
    },
    "server": "Localhost",
    "options": {
      "validateBulkLoadParameters": false,
      "rowCollectionOnRequestCompletion": true,
      "database": "BFSInventory",
      "encrypt": false,
      "enableArithAbort": false
    }
  });
  connection.connect((err) => {
    if (err)
      return callback(err, null);
    const request = new Request(sql, (err, rowCount, rows) => {
      connection.close();
      if (err)
        return callback(err, null);
      callback(null, {rowCount, rows});
    });
    connection.execSql(request);
    //console.log(connection);
  });
};
executeSQL(`SELECT * FROM dbo.Inventory where Length=25`, (err, data) => {
    if (err)
      console.error(err);
    console.log(data);
  });