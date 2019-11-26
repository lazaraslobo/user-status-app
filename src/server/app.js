const express = require('express');
const mySqlCon = require("./mysql.connect");
const app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

const port = 8080;
app.listen(port, () => console.log(`App running on port http://localhost:${port}`));