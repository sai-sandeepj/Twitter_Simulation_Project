var express = require('express');
var app = express();
var mysqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');

app.get('/getProfile', async (req,res)=>{
    console.log("In getProfile GET");
    
    mysqlPool.getConnection(async (err, conn)=>{
        if (err) {
            console.log("Error while creating connection");
            res.writeHead(500, {
              "Content-type": "text/plain"
            });
            res.end("Error while creating connection");
          }else{

              const sql1 = 'SELECT * FROM users WHERE userName= '+
                mysql.escape(req.body.userName);

                conn.query(sql1, (err, result1)=>{
                    if (err) {
                        console.log("Error in retrieving profile data");
                        res.writeHead(400, {
                            "Content-type": "text/plain"
                        });
                        res.end("Error in retrieving profile data");
                    }else{
                        console.log("Profile data: ",result1);
                        res.status(200).end(JSON.stringify(result1));
                    }
                });
          }
    });
});

module.exports = app;