const r = require('rethinkdb');

// connect to the database
r.connect({
  host: 'localhost',
  port: 28015,
  db: 'mydb'
}, (err, conn) => {
  if (err) throw err;

  // create a new table
  // createTable(conn, 'users');
  // add some users
  // addUsers(conn);
  // get all users
  getUsers(conn);
});

function createTable(conn, tableName) {
  r.db('mydb').tableCreate(tableName).run(conn, (err, result) => {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
}

function addUsers(conn) {
  const users = [
    { name: 'Tony Stark', city: 'Westlands', age: 30 },
    { name: 'Tessie Swift', city: 'Ruaka', age: 28 },
    { name: 'Ken Steve', city: 'Nakuru', age: 30 },
    { name: 'Stella Phil', city: 'Westlands', age: 31 }
  ];

  r.table('users')
    .insert(users)
    .run(conn, (err, result) => console.log(JSON.stringify(result, null, 2)));
}

function getUsers(conn) {
  r.table('users')
    .run(conn, (err, cursor) => {
      cursor.toArray((err, result) => console.log(JSON.stringify(result, null, 2)))
    });
}