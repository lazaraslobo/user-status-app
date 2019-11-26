require('dotenv').config();
const express = require('express');
const mySqlCon = require("./mysql.connect");
const app = express()

const base_url = process.env.base_url || "";

app.post(base_url+'/', function (req, res) {
  res.send('hello world')
});

app.post(base_url+'/validateUser', function (req, res) {
    res.send('hello world, i am validate user');
});

app.post(base_url+'/addNewUser', function (req, res) {
    res.send('hello world, i am new user');
});

app.post(base_url+'/updateUser', function (req, res) {
    res.send('hello world, i am update user');
});

const port = 8080;
app.listen(port, () => console.log(`App running on port http://localhost:${port}${base_url}/`));