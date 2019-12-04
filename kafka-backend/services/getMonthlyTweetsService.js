const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const { Musers } = require("../model/Musers");
const { tweets } = require("../model/tweets");
const { messages } = require("../model/messages");

async function handle_request(msg, callback) {

    console.log("Inside getMonthlyTweets in kafka backend");
    let response = {};
    let err = {};

    var months = {
        jan: 0, feb: 0,
        mar: 0, apr: 0,
        may: 0, jun: 0,
        jul: 0, aug: 0,
        sep: 0, oct: 0,
        nov: 0, dec: 0
    };

    return await tweet
        .find({})
        .then(result => {
            console.log("got tweets");

            result.forEach(doc => {
                console.log(doc);
                console.log("--------------");
                console.log(doc.tweetDate);

                var mon = (doc.tweetDate).split(" ")[1];

                if (mon.includes("Jan")) {
                    months.jan = months.jan + 1;
                }
                if (mon.includes("Feb")) {
                    months.feb = months.feb + 1;
                }
                if (mon.includes("Mar")) {
                    months.mar = months.mar + 1;
                }
                if (mon.includes("Apr")) {
                    months.apr = months.apr + 1;
                }
                if (mon.includes("May")) {
                    months.may = months.may + 1;
                }
                if (mon.includes("Jun")) {
                    months.jun = months.jun + 1;
                }
                if (mon.includes("Jul")) {
                    months.jul = months.jul + 1;
                }
                if (mon.includes("Aug")) {
                    months.aug = months.aug + 1;
                }
                if (mon.includes("Sep")) {
                    months.sep = months.sep + 1;
                }
                if (mon.includes("Oct")) {
                    months.oct = months.oct + 1;
                }
                if (mon.includes("Nov")) {
                    months.nov = months.nov + 1;
                }
                if (mon.includes("Dec")) {
                    months.dec = months.dec + 1;
                }
            });

            console.log(months);
            //res.end(JSON.stringify(months));
            response.status = 200;
            response.data = JSON.stringify(months);
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