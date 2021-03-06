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
    let sql = "SELECT * FROM `users_tbl` WHERE `email_id` = '"+req.body.userEmail+"' AND `password` = '"+req.body.userPassword+"'";
    await mySqlCon.query(sql, async function (err, result, fields) {
        if (err) throw new Error(err);
        console.log("resp ", result);
        let resp     = stringJson(result);
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
                if (err) throw new Error(err);
                return res.send({data : {msg : "User Created Successfully!", isProfileCreated : true, status : "success"}})
            })
        }

    });
}));

app.post(base_url+'/updateUser', async function (req, res) {
    let pass = req.body.userPassword ? "`password` = '"+req.body.userPassword+"'," : "";
    let updateQuery = "UPDATE users_tbl SET "+pass+" `first_name` = '"+req.body.firstName+"', `last_name` = '"+req.body.lastName+"', `phone`='"+req.body.phone+"' WHERE `email_id` = '"+req.body.userEmail+"' AND `session_hash`='"+req.body.session_hash+"'";
    await mySqlCon.query(updateQuery, async function (err, result, fields) {
        if (err) throw new Error(err);
        let response = stringJson(result);
        console.log(response);
        res.send({data : {msg : messages[3], ...req.body}, status : "success"});
    });
});

app.post(base_url+'/getUserDetails', async function (req, res) {
    let getQuery = "SELECT * FROM users_tbl WHERE `email_id` = '"+req.body.email_id+"' AND `session_hash`='"+req.body.session_hash+"'";
    await mySqlCon.query(getQuery, async function (err, result, fields) {
        if (err) throw new Error(err);
        let response = stringJson(result);
        console.log(getQuery);
        if(response.length){
            delete response[0].password;
            return res.send({data : {msg : messages[3], ...response[0]}, status : "success"});
        }else{
            return res.send({data : {msg : messages[4]}, status : "success"});
        }
    });
});

app.post(base_url+'/addNewStatus', async function (req, res) {
    let sql = "SELECT * FROM `users_tbl` WHERE `email_id` = '"+req.body.userEmail+"' AND `session_hash` = '"+req.body.session_hash+"'";
    await mySqlCon.query(sql, async function (err, result, fields) {
        if (err) throw new Error(err);
        if(!stringJson(result).length){
            return res.send({data : {msg : messages[2]}, isAccCreated : false, status : "success"})
        }
        let sql = "INSERT INTO status_tbl (email_id, date, summary) VALUES ('"+req.body.userEmail+"', '"+req.body.summaryDate+"', '"+req.body.userSummary+"')";
        await mySqlCon.query(sql, async function (err, result, fields) {
            if (err) throw new Error(err);
            if(stringJson(result)){
                return res.send({data : {msg : messages[5], isAccCreated : true}, status : "success"});
            }else{
                return res.send({data : {msg : messages[6], isAccCreated : false}, status : "failed"});
            }
        });
    });
});

app.post(base_url+'/getStatus', async function (req, res) {
    console.log(req.body);
    let sql = "SELECT * FROM `users_tbl` WHERE `email_id` = '"+req.body.email_id+"' AND `session_hash` = '"+req.body.session_hash+"'";
    await mySqlCon.query(sql, async function (err, result, fields) {
        if (err) throw new Error(err);
        if(!stringJson(result).length){
            return res.send({data : {msg : messages[2]}, status : "success"})
        }
        let sql = "SELECT * FROM `status_tbl` WHERE `email_id` = '"+req.body.email_id+"'";
        await mySqlCon.query(sql, async function (err, result, fields) {
            if (err) throw new Error(err);
            if(stringJson(result).length){
                return res.send({data : {msg : messages[7], status : stringJson(result)}, status : "success"})
            }else{
                return res.send({data : {msg : messages[8], status : []}, status : "success"})
            }
        })
    })
});

app.post(base_url+'/deleteStatus', async function (req, res) {
    console.log(req.body);
    let sql = "SELECT * FROM `users_tbl` WHERE `email_id` = '"+req.body.email_id+"' AND `session_hash` = '"+req.body.session_hash+"'";
    await mySqlCon.query(sql, async function (err, result, fields) {
        if (err) throw new Error(err);
        if(!stringJson(result).length){
            return res.send({data : {msg : messages[2]}, status : "success"})
        }
        let sql = "DELETE FROM `status_tbl` WHERE `status_id` = "+req.body.status_id+" LIMIT 1";
        await mySqlCon.query(sql, async function (err, result, fields) {
            if (err) throw new Error(err);
            if(stringJson(result)){
                return res.send({data : {msg : messages[9], isDeleted : true}, status : "success"})
            }else{
                return res.send({data : {msg : messages[10], isDeleted : false}, status : "success"})
            }
        })
    })
});

const port = 8080;
app.listen(port, () => console.log(`App running on port http://localhost:${port}${base_url}/`));