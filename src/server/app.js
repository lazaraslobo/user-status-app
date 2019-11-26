require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
const mySqlCon = require("./mysql.connect");
const app = express()
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const base_url = process.env.base_url || "";

app.post(base_url+'/', function (req, res) {
  res.send('hello world')
});

app.post(base_url+'/validateUser', function (req, res) {
    res.send({data : req.body});
});

app.post(base_url+'/addNewUser', function (req, res) {
    res.send('hello world, i am new user');
});

app.post(base_url+'/updateUser', function (req, res) {
    res.send('hello world, i am update user');
});

const port = 8080;
app.listen(port, () => console.log(`App running on port http://localhost:${port}${base_url}/`));