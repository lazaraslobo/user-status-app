require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
const mySqlCon = require("./mysql.connect");

const executeSql = require("./queries-utilities/execute.query");

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

app.get(base_url+'/addNewUser', async (req, res) => {
    console.log("body ", req.body);
    
    // var sql = `INSERT INTO users_tbl (email_id,first_name,last_name,password,phone,session_hash) 
    //            VALUES ('lobo@gmail.com', 'Highway 37', 'Highway 37', 'Highway 37', 8098988909, 'hdfjkhfg7897dfgmh')`;
    var sql = "SELECT `email_id` FROM `users_tbl` WHERE `email_id` = 'lobo@gmail.com'";
    let resp = await executeSql(mySqlCon, sql);
    console.log("resp ", resp);
    let isEmailExists = await executeSql(mySqlCon, sql)[0] ? true : false;
    res.send({data : {status : "success", is : isEmailExists}});
});

app.post(base_url+'/updateUser', function (req, res) {
    res.send('hello world, i am update user');
});

const port = 8080;
app.listen(port, () => console.log(`App running on port http://localhost:${port}${base_url}/`));