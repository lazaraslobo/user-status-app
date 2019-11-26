let mysql = require('mysql');

const con = mysql.createConnection({
  host      : process.env.host,
  user      : process.env.user,
  password  : "",
  database  : process.env.database
});

con.connect((err) => {
    if (err) throw err.message;
    console.log("Connected!", process.env.database);
});

module.exports = con;