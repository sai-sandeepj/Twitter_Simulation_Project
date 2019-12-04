const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var pool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { Musers } = require("../model/Musers");
const { tweets } = require("../model/tweets");
const { lists } = require("../model/lists");


async function handle_request(msg, callback) {

    console.log("Inside deactivateAccount in kafka backend");
    let response = {};
    let err = {};

    const sql = "DELETE FROM users WHERE userName = " +
        mysql.escape(msg.userName) + ";"

    pool.getConnection((error, conn) => {
        if (error) {
            console.log(error);
            //res.end("error connecting to db");
            err.status = 500;
            err.message = "Error while connecting to database";
            err.data = error;
            return callback(err, null);
        } else {
            conn.query(sql, async (error, result) => {
                if (error) {
                    console.log("could not get users");
                    //res.end("error in getting users");
                    err.status = 400;
                    err.message = "error in getting users";
                    err.data = error;
                    return callback(err, null);
                } else {
                    console.log("users table deleted");

                    return await Musers
                        .find({ userName: msg.userName })
                        .remove()
                        .then(async result1 => {
                            console.log("musers table row deleted");

                            return await tweets
                                .find({ userName: msg.userName })
                                .remove()
                                .then(async result2 => {
                                    console.log("tweets table row deleted");

                                    return await lists
                                        .find({ userName: msg.userName })
                                        .remove()
                                        .then(result3 => {
                                            console.log("profile deactivated");
                                            //res.end("profile deactivated");
                                            response.status = 200;
                                            response.message = "Profile deactivated";
                                            response.data = token;
                                            return callback(null, response);
                                        })
                                        .catch(error => {
                                            console.log(error);
                                            //res.end("could not delete lists row");
                                            err.status = 410;
                                            err.message = "could not delete lists row";
                                            err.data = error;
                                            return callback(err, null);
                                        })

                                })
                                .catch(error => {
                                    console.log(error);
                                    //res.end("could not delete tweets row");
                                    err.status = 411;
                                    err.message = "could not delete tweets row";
                                    err.data = error;
                                    return callback(err, null);
                                })

                        })
                        .catch(error => {
                            console.log(error);
                            //res.end("could not delete musers");
                            err.status = 412;
                            err.message = "could not delete musers";
                            err.data = error;
                            return callback(err, null);
                        })

                }
            })
        }
    })
};

exports.handle_request = handle_request;