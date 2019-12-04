const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const { Musers } = require("../model/Musers");
const { tweets } = require("../model/tweets");
const { messages } = require("../model/messages");

async function handle_request(msg, callback) {

    console.log("Inside getHourlyTweets in kafka backend");
    let response = {};
    let err = {};

    var hourly = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    return await tweets
        .find({})
        .then(result => {
            console.log("got tweets");

            result.forEach(doc => {

                var mon = (doc.tweetDate).split(" ")[1];
                var dy = (doc.tweetDate).split(" ")[2];
                var hr = (doc.tweetDate).split(" ")[4];

                if (mon.includes("Dec")) {
                    if (dy.includes("03")) {

                        if (hr === "0") {
                            hourly[0] = hourly[0] + 1;
                        }
                        if (hr === "1") {
                            hourly[1] = hourly[1] + 1;
                        }
                        if (hr === "2") {
                            hourly[2] = hourly[2] + 1;
                        }
                        if (hr === "3") {
                            hourly[3] = hourly[3] + 1;
                        }
                        if (hr === "4") {
                            hourly[4] = hourly[4] + 1;
                        }
                        if (hr === "5") {
                            hourly[5] = hourly[5] + 1;
                        }
                        if (hr === "6") {
                            hourly[6] = hourly[6] + 1;
                        }
                        if (hr === "7") {
                            hourly[7] = hourly[7] + 1;
                        }
                        if (hr === "8") {
                            hourly[8] = hourly[8] + 1;
                        }
                        if (hr === "9") {
                            hourly[9] = hourly[9] + 1;
                        }
                        if (hr === "10") {
                            hourly[10] = hourly[10] + 1;
                        }
                        if (hr === "11") {
                            hourly[11] = hourly[11] + 1;
                        }
                        if (hr === "12") {
                            hourly[12] = hourly[12] + 1;
                        }
                        if (hr === "13") {
                            hourly[13] = hourly[13] + 1;
                        }
                        if (hr === "14") {
                            hourly[14] = hourly[14] + 1;
                        }
                        if (hr === "15") {
                            hourly[15] = hourly[15] + 1;
                        }
                        if (hr === "16") {
                            hourly[16] = hourly[16] + 1;
                        }
                        if (hr === "17") {
                            hourly[17] = hourly[17] + 1;
                        }
                        if (hr === "18") {
                            hourly[18] = hourly[18] + 1;
                        }
                        if (hr === "19") {
                            hourly[19] = hourly[19] + 1;
                        }
                        if (hr === "20") {
                            hourly[20] = hourly[20] + 1;
                        }
                        if (hr === "21") {
                            hourly[21] = hourly[21] + 1;
                        }
                        if (hr === "22") {
                            hourly[22] = hourly[22] + 1;
                        }
                        if (hr === "23") {
                            hourly[23] = hourly[23] + 1;
                        }

                    }
                }

                if (mon.includes("Dec")) {
                    if (dy.includes("04")) {

                        if (hr === "0") {
                            hourly[0] = hourly[0] + 1;
                        }
                        if (hr === "1") {
                            hourly[1] = hourly[1] + 1;
                        }
                        if (hr === "2") {
                            hourly[2] = hourly[2] + 1;
                        }
                        if (hr === "3") {
                            hourly[3] = hourly[3] + 1;
                        }
                        if (hr === "4") {
                            hourly[4] = hourly[4] + 1;
                        }
                        if (hr === "5") {
                            hourly[5] = hourly[5] + 1;
                        }
                        if (hr === "6") {
                            hourly[6] = hourly[6] + 1;
                        }
                        if (hr === "7") {
                            hourly[7] = hourly[7] + 1;
                        }
                        if (hr === "8") {
                            hourly[8] = hourly[8] + 1;
                        }
                        if (hr === "9") {
                            hourly[9] = hourly[9] + 1;
                        }
                        if (hr === "10") {
                            hourly[10] = hourly[10] + 1;
                        }
                        if (hr === "11") {
                            hourly[11] = hourly[11] + 1;
                        }
                        if (hr === "12") {
                            hourly[12] = hourly[12] + 1;
                        }
                        if (hr === "13") {
                            hourly[13] = hourly[13] + 1;
                        }
                        if (hr === "14") {
                            hourly[14] = hourly[14] + 1;
                        }
                        if (hr === "15") {
                            hourly[15] = hourly[15] + 1;
                        }
                        if (hr === "16") {
                            hourly[16] = hourly[16] + 1;
                        }
                        if (hr === "17") {
                            hourly[17] = hourly[17] + 1;
                        }
                        if (hr === "18") {
                            hourly[18] = hourly[18] + 1;
                        }
                        if (hr === "19") {
                            hourly[19] = hourly[19] + 1;
                        }
                        if (hr === "20") {
                            hourly[20] = hourly[20] + 1;
                        }
                        if (hr === "21") {
                            hourly[21] = hourly[21] + 1;
                        }
                        if (hr === "22") {
                            hourly[22] = hourly[22] + 1;
                        }
                        if (hr === "23") {
                            hourly[23] = hourly[23] + 1;
                        }

                    }
                }

            });

            console.log(hourly);
            //res.end(JSON.stringify(hourly));
            response.status = 200;
            response.data = JSON.stringify(hourly);
            return callback(null, response);

        })
        .catch(error => {
            console.log(error);
            //res.end("could not get tweets");
            err.status = 410;
            err.message = "could not get tweets";
            err.data = error;
            return callback(err, null);
        })

};

exports.handle_request = handle_request;