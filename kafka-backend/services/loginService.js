const express = require("express");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var secret = "cmpe273_kafka_passport_mongo";
const app = express.Router();


async function handle_request(msg, callback) {

    console.log("Inside follow user in kafka backend");
    let response = {};
    let err = {};

    mySqlPool.getConnection((error, conn) => {
        if (error) {
            console.log("Error while connecting to database");
            err.status = 500;
            err.message = "Error while connecting to database";
            err.data = error;
            return callback(err, null);
        } else {
            //query
            const sql1 = `SELECT * FROM users where userEmail= ${mysql.escape(msg.userEmail)}
                            AND userPassword = ${mysql.escape(msg.userPassword)}`;

            conn.query(sql1, (error, result) => {
                if (error) {
                    console.log("Invalid credentials");
                    err.status = 410;
                    err.message = "Invalid credentials";
                    err.data = error;
                    return callback(err, null);
                } else {
                    if (result.length == 0) {
                        err.status = 411;
                        err.message = "Invalid credentials";
                        err.data = error;
                        return callback(err, null);
                    }
                    else {
                        console.log(result);
                        let payload = _.pick(result[0], ["firstName", "lastName", "userName", "userEmail", "aboutMe", "userImage"]);
                        var payload1 = result[0].userName + "," + result[0].userEmail;
                        console.log("payload1----:" + payload1);
                        console.log(payload);
                        var token = jwt.sign(payload, secret, {
                            expiresIn: 900000 // in seconds
                        });
                        console.log("Successfully logged in");
                        response.status = 200;
                        response.message = "Successfully logged in";
                        response.data = token;
                        return callback(null, response);
                    }
                }
            });
        }
    });

};

exports.handle_request = handle_request;