const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { Musers } = require("../model/Musers");


async function handle_request(msg, callback) {

    console.log("Inside get profile in kafka backend");
    let response = {};
    let err = {};

    var final_result = [];
    var array_day;
    var array_day_counter;

    mysqlPool.getConnection(async (error, conn) => {
        if (error) {
            console.log("Error while creating connection");
            err.status = 500;
            err.message = "Error while creating connection";
            err.data = error;
            return callback(err, null);
        } else {

            const sql1 = 'SELECT * FROM users WHERE userName= ' +
                mysql.escape(msg.userName);

            conn.query(sql1, async (error, result1) => {
                if (error) {
                    console.log("Error in retrieving profile data");
                    err.status = 400;
                    err.message = "Error in retrieving profile data";
                    err.data = error;
                    return callback(err, null);
                } else {
                    console.log("Profile data: ", result1);
                    final_result.push(result1);

                    return await Musers
                        .findOne({ userName: msg.userName })
                        .select()
                        .then(async result2 => {
                            console.log("got profile");
                            final_result.push(result2);

                            var d = new Date().toString();
                            var l = d.split(' ').splice(0, 4).join(' ');

                            var same_day = false;

                            for (var i = 0; i < (result2.views).length; i++) {

                                if ((result2.views[i].viewDate) === l) {
                                    same_day = true;
                                    console.log(same_day);
                                    array_day = i;
                                    array_day_counter = result2.views[i].viewCounter;
                                    console.log("----" + array_day);
                                    console.log("****" + array_day_counter);
                                    break;
                                }
                            }

                            if (same_day === true) {
                                console.log("increase counter");
                                //res.end("increase counter");

                                console.log("------------" + array_day);
                                console.log("------------" + array_day_counter);

                                return await Musers
                                    .update(
                                        { userName: msg.userName, 'views.viewDate': l },
                                        { $set: { "views.$.viewCounter": (array_day_counter + 1) } },
                                        { new: true }
                                    )
                                    .then(result3 => {
                                        console.log(final_result);
                                        //res.end("" + final_result);
                                        response.status = 200;
                                        response.message = "new date created";
                                        response.data = JSON.stringify(final_result);
                                        return callback(null, response);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        //res.end("could not update musers");
                                        err.status = 410;
                                        err.message = "could not update musers";
                                        err.data = error;
                                        return callback(err, null);
                                    })
                            } else {
                                console.log("create new date");

                                var new_date = {
                                    viewDate: l,
                                    viewCounter: 1
                                }

                                return await Musers
                                    .update(
                                        { userName: msg.userName },
                                        { $push: { views: new_date } },
                                        { new: true }
                                    )
                                    .then(result10 => {
                                        console.log("new date created");
                                        //res.end("" + final_result);
                                        response.status = 200;
                                        response.message = "new date created";
                                        response.data = JSON.stringify(final_result);
                                        return callback(null, response);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        //res.end("could not create musers");
                                        err.status = 411;
                                        err.message = "could not create musers";
                                        err.data = error;
                                        return callback(err, null);
                                    })
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            //res.end("could not get musers");
                            err.status = 412;
                            err.message = "could not get musers";
                            err.data = error;
                            return callback(err, null);
                        })
                }
            });
        }
    });

};

exports.handle_request = handle_request;