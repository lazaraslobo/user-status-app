"use strict";
require('dotenv').config();
const to = require('await-to-js').default;
const mySqlCon = require("./mysql.connect");
const express = require('express');
let bodyParser = require('body-parser');
const messages = require("./messages.map");
const stringJson = require("./json.parser").stringJson
let md5 = require('md5');

const app = express();
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const base_url = process.env.base_url || "";

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.post(base_url+'/', async function (req, res) {
  res.send('hello world')
});

app.post(base_url+'/verifyHash', async (req, res) => {
    console.log(req.body);
//     email_id: 'lobo@lobo.com',
//   session_hash: '03549dd9aa94a178cae94b2cd3b5fd1c'
    let sql = "SELECT * FROM `users_tbl` WHERE `email_id` = '"+req.body.email_id+"' AND `session_hash` = '"+req.body.session_hash+"'";
    await mySqlCon.query(sql, async function (err, result, fields) {
        if (err) throw new Error(err);
        if(stringJson(result).length){
            return res.send({data : {isValidHash : true}, status : "success"})
        }else{
            return res.send({data : {isValidHash : false}, status : "success"})
        }
    });
});

app.post(base_url+'/validateUser', async (req, res) => {
    console.log("body ", req.body);
    let sql = "SELECT * FROM `users_tbl` WHERE `email_id` = '"+req.body.userEmail+"' AND `password` = '"+req.body.userPassword+"'";
    await mySqlCon.query(sql, async function (err, result, fields) {
        if (err) throw new Error(err);
        console.log("resp ", result);
        resp     = stringJson(resp);
        if(!resp.length){
            return res.send({data : {isValidUser : false, msg : messages[2]}});
        }
        delete resp[0].password;

        return res.send({data : {isValidUser : true, ...resp[0]}});

    });
});

app.post(base_url+'/addNewUser', asyncMiddleware(async (req, res) =>{
    // console.log("body ", req.body);
    let sql = "SELECT `email_id` FROM `users_tbl` WHERE `email_id` = '"+req.body.userEmail+"'";
    await mySqlCon.query(sql, async function (err, result, fields) {
        if (err) throw new Error(err);
        let emailIdResp = stringJson(result);
        if(emailIdResp.length){
            return res.send({data : {msg : messages[1]}, status : "success"});
        }else{
            let sql = `INSERT INTO users_tbl (email_id,first_name,last_name,password,phone,session_hash) VALUES (
                        '${req.body.userEmail}', 
                        '${req.body.firstName}', 
                        '${req.body.lastName}', 
                        '${req.body.userPassword}', 
                        '${req.body.phone}', 
                        '${md5(req.body.userEmail+req.body.firstName)}'
                )`;

            await mySqlCon.query(sql, async function (err, result, fields) {
                if(err) throw err;
                console.log("user creation resp =>  ", result);
                res.status(200);
                return res.send({data : {msg : "User Created Successfully!", status : "success"}})
            })
        }

    });
}));

app.post(base_url+'/updateUser', async function (req, res) {
    res.send('hello world, i am update user');
});

const port = 8080;
app.listen(port, () => console.log(`App running on port http://localhost:${port}${base_url}/`));