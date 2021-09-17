const r = require('rethinkdb');

// connect to the database
r.connect({
  host: 'localhost',
  port: 28015,
  db: 'mydb'
}, (err, conn) => {
  if (err) throw err;

  // create a new table
  createTable(conn, 'users');
});

function createTable(conn, tableName) {
  r.db('mydb').tableCreate(tableName).run(conn, (err, result) => {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
}