const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
const pool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require("../model/Musers");
const { tweets } = require("../model/tweets");
const { lists } = require("../model/lists");
const { messages } = require("../model/messages");

async function handle_request(msg, callback) {

    console.log("Inside update profile in kafka backend");
    let response = {};
    let error = {};

    const sql = "UPDATE users SET userPassword = " +
        mysql.escape(msg.userPassword) + ", firstName = " +
        mysql.escape(msg.firstName) + ", lastName = " +
        mysql.escape(msg.lastName) + ", gender = " +
        mysql.escape(msg.gender) + ", aboutMe = " +
        mysql.escape(msg.aboutMe) + ", userImage = " +
        mysql.escape(msg.userImage) + ", city = " +
        mysql.escape(msg.city) + ", state = " +
        mysql.escape(msg.state) + ", zipCode = " +
        mysql.escape(msg.zipCode) + ", userPhone = " +
        mysql.escape(msg.userPhone) + " WHERE userName = " +
        mysql.escape(msg.userName) + ";"


    pool.getConnection((error, conn) => {
        if (error) {
            console.log(error);
            //res.end("error connecting to db");
            err.status = 500;
            err.message = "error connecting to db";
            err.data = error;
            return callback(err, null);
        } else {
            conn.query(sql, (error, result) => {
                if (error) {
                    console.log("could not get users");
                    //res.end("error in getting users");
                    err.status = 410;
                    err.message = "could not get users";
                    err.data = error;
                    return callback(err, null);
                } else {
                    console.log("users table updated");
                    //res.end("profile data updated");
                    response.status = 200;
                    response.message = "profile data updated";
                    //response.data = JSON.stringify(result);
                    return callback(null, response);

                }
            })
        }
    })

};

exports.handle_request = handle_request;