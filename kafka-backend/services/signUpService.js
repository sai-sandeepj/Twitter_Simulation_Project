var express = require('express');
const _ = require("lodash");
var app = express();
const bcrypt = require("bcryptjs");
//var { Users } = require('../models/Users');
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require('../model/Musers');

async function handle_request(msg, callback) {

    console.log("Inside signup in kafka backend");
    let response = {};
    let err = {};

    const sql1 = "INSERT into users (userName, userPassword, userEmail, firstName, lastName, gender, aboutMe, userImage, city, state, zipCode, userPhone ) VALUES (" +

        mysql.escape(msg.userName) + "," +
        mysql.escape(msg.userPassword) + "," +
        mysql.escape(msg.userEmail) + "," +
        mysql.escape(msg.firstName) + "," +
        mysql.escape(msg.lastName) + "," +
        mysql.escape(msg.gender) + "," +
        mysql.escape(msg.aboutMe) + "," +
        mysql.escape(msg.userImage) + "," +
        mysql.escape(msg.city) + "," +
        mysql.escape(msg.state) + "," +
        mysql.escape(msg.zipCode) + "," +
        mysql.escape(msg.userPhone) + ");";

    mySqlPool.getConnection((error, conn) => {
        if (error) {
            console.log("Error while connecting to database", err);
            err.status = 500;
            err.message = "Error while connecting to database";
            err.data = error;
            return callback(err, null);
        } else {
            conn.query(sql1, async (error, result) => {
                if (error) {
                    // res.writeHead(400, {
                    //     'Content-type': 'text/plain'
                    // });
                    // err.status = 400;
                    // err.message = "cannot insert user details";
                    // err.data = error;
                    //return callback(err, null);

                    if (error.sqlMessage.includes("PRIMARY")) {
                        console.log("Use different username");
                        err.status = 410;
                        err.message = "Use different username";
                        err.data = error;
                        return callback(err, null);
                    } else if (error.sqlMessage.includes("userEmail")) {
                        console.log("Use different userEmail");
                        err.status = 411;
                        err.message = "Use different userEmail";
                        err.data = error;
                        return callback(err, null);
                    } else {
                        console.log(error);
                        err.status = 413;
                        err.message = "Please try to signup again";
                        err.data = error;
                        return callback(err, null);
                    }
                } else {
                    var new_user = new Musers({
                        userName: msg.userName,
                        firstName: msg.firstName,
                        lastName: msg.lastName,
                        profileImage: msg.profileImage
                    });

                    new_user.save((error) => {
                        if (error) {
                            err.status = 412;
                            err.message = "error in saving user details";
                            err.data = error;
                            return callback(err, null);
                        } else {
                            console.log("Signup successful");
                            response.status = 200;
                            response.message = "Signup successful!!!";
                            return callback(null, response);
                        }
                    });
                }
            });
        }
    });

};

exports.handle_request = handle_request;