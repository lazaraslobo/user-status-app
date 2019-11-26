let mysql = require('mysql');

const con = mysql.createConnection({
  host      : "localhost",
  user      : "root",
  password  : "",
  database  : "userStatusDB"
});

con.connect((err) => {
  if (err) throw err.message;
  console.log("Connected!");
});

module.exports = con;