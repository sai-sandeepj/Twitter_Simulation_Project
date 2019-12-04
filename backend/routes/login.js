const express = require('express');
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');

const app = express.Router();

//login
app.post('/login', async (req, res) => {
    console.log("In login post", req.body);

    mySqlPool.getConnection((err, conn) => {
        if (err) {
            console.log("Error while connecting to database");
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end("Error while connecting to database");
        } else {
            //query
            const sql1 = `SELECT * FROM users where userEmail= ${mysql.escape(req.body.userEmail)}
                            AND userPassword = ${mysql.escape(req.body.userPassword)}`;

            conn.query(sql1, (err, result) => {
                if (err) {
                    res.writeHead(400, {
                        'Contnet-type': 'text/plain'
                    });
                    res.end("Invalid credentials");
                } else {
                    if (result.length == 0) {
                        res.writeHead(402, {
                            'Content-type': 'text/plain'
                        });
                        console.log("Invalid credentials");
                        res.end("Invalid credentials");
                    } else {
                        console.log(result);
                        res.end(JSON.stringify(result[0]));
                    }
                }
            });
        }
    });

});




module.exports = app;