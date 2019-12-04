const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const { Musers } = require("../model/Musers");
const { tweets } = require("../model/tweets");
const { messages } = require("../model/messages");

async function handle_request(msg, callback) {

    console.log("Inside getDailyTweets in kafka backend");
    let response = {};
    let err = {};

    var dates = {
        date1: 0, date2: 0, date3: 0, date4: 0, date5: 0,
        date6: 0, date7: 0, date8: 0, date9: 0, date10: 0,
        date11: 0, date12: 0, date13: 0, date14: 0, date15: 0,
        date16: 0, date17: 0, date18: 0, date19: 0, date20: 0,
        date21: 0, date22: 0, date23: 0, date24: 0, date25: 0,
        date26: 0, date27: 0, date28: 0, date29: 0, date30: 0
    };

    return await tweets
        .find({})
        .then(result => {
            console.log("got tweets");
            result.forEach(doc => {

                var dy = (doc.tweetDate).split(" ")[2];

                if (dy.includes("01")) {
                    dates.date1 = dates.date1 + 1;
                }
                if (dy.includes("02")) {
                    dates.date2 = dates.date2 + 1;
                }
                if (dy.includes("03")) {
                    dates.date3 = dates.date3 + 1;
                }
                if (dy.includes("04")) {
                    dates.date4 = dates.date4 + 1;
                }
                if (dy.includes("05")) {
                    dates.date5 = dates.date5 + 1;
                }
                if (dy.includes("06")) {
                    dates.date6 = dates.date6 + 1;
                }
                if (dy.includes("07")) {
                    dates.date7 = dates.date7 + 1;
                }
                if (dy.includes("08")) {
                    dates.date8 = dates.date8 + 1;
                }
                if (dy.includes("09")) {
                    dates.date9 = dates.date9 + 1;
                }
                if (dy.includes("10")) {
                    dates.date10 = dates.date10 + 1;
                }
                if (dy.includes("11")) {
                    dates.date11 = dates.date11 + 1;
                }
                if (dy.includes("12")) {
                    dates.date12 = dates.date12 + 1;
                }
                if (dy.includes("13")) {
                    dates.date13 = dates.date13 + 1;
                }
                if (dy.includes("14")) {
                    dates.date14 = dates.date14 + 1;
                }
                if (dy.includes("15")) {
                    dates.date15 = dates.date15 + 1;
                }
                if (dy.includes("16")) {
                    dates.date16 = dates.date16 + 1;
                }
                if (dy.includes("17")) {
                    dates.date17 = dates.date17 + 1;
                }
                if (dy.includes("18")) {
                    dates.date18 = dates.date18 + 1;
                }
                if (dy.includes("19")) {
                    dates.date19 = dates.date19 + 1;
                }
                if (dy.includes("20")) {
                    dates.date20 = dates.date20 + 1;
                }
                if (dy.includes("21")) {
                    dates.date21 = dates.date21 + 1;
                }
                if (dy.includes("22")) {
                    dates.date22 = dates.date22 + 1;
                }
                if (dy.includes("23")) {
                    dates.date23 = dates.date23 + 1;
                }
                if (dy.includes("24")) {
                    dates.date24 = dates.date24 + 1;
                }
                if (dy.includes("25")) {
                    dates.date25 = dates.date25 + 1;
                }
                if (dy.includes("26")) {
                    dates.date26 = dates.date26 + 1;
                }
                if (dy.includes("27")) {
                    dates.date27 = dates.date27 + 1;
                }
                if (dy.includes("28")) {
                    dates.date28 = dates.date28 + 1;
                }
                if (dy.includes("29")) {
                    dates.date29 = dates.date29 + 1;
                }
                if (dy.includes("30")) {
                    dates.date30 = dates.date30 + 1;
                }

            });

            console.log(dates);
            //res.end(JSON.stringify(dates));
            response.status = 200;
            response.data = JSON.stringify(dates);
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