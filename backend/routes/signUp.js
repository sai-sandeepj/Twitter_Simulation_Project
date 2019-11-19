const express = require('express');
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
const app = express.Router();
const bcrypt = require('bcrypt-nodejs');

var Musers = require('../model/Musers');

//signin
app.post('/signUp', async (req,res)=>{
    console.log("In Signup post");
    
    const sql1 = "INSERT into users (userName, userPassword, userEmail, firstName, lastName, gender, aboutMe, userImage, city, state, zipCode, userPhone ) VALUES ("+

    mysql.escape(req.body.userName) +","+
    mysql.escape(req.body.userPassword)+ ","+
    mysql.escape(req.body.userEmail)+ ","+
    mysql.escape(req.body.firstName)+ ","+
    mysql.escape(req.body.lastName)+ ","+
    mysql.escape(req.body.gender)+ ","+
    mysql.escape(req.body.aboutMe)+ ","+
    mysql.escape(req.body.userImage)+ ","+
    mysql.escape(req.body.city)+ ","+
    mysql.escape(req.body.state)+ ","+
    mysql.escape(req.body.zipCode)+ ","+
    mysql.escape(req.body.userPhone)+ ");";

    mySqlPool.getConnection((err, conn) => {
        if (err) {
            console.log("Error");
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end("Error in connecting connection");
        }
        else {
            conn.query(sql1, async (err, result) => {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    //console.log(err);
                    if (err.sqlMessage.includes("PRIMARY")){
                        console.log("Use different username");
                        res.status(410).end("Use different username");
                        
                    }else if (err.sqlMessage.includes("userEmail")) {
                        console.log("Use different userEmail");
                        res.status(411).end("Use different userEmail");
                    }else {
                        console.log(err);
                        res.end("Please try to signup again");
                    }
                }
                else {
                    var new_user = new Musers({
                        userName: req.body.userName
                    });

                    await new_user.save().then((new_userM)=>{
                        console.log("user details saved in Musers");
                    })
                    .catch((err)=>{
                        console.log(err);
                        return res.status(411).end(""+err);
                    });

                    res.writeHead(200, {
                        'Content-type': 'text/plain'
                    });
                    console.log("Signup successful");
                    res.end("Signup successful");
                }
            });
        }
    });
});


module.exports = app;