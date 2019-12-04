const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { Musers } = require("../model/Musers");
const { lists } = require("../model/lists");

async function handle_request(msg, callback) {

    console.log("Inside getUserRetweetIds in kafka backend");
    let response = {};
    let err = {};

    return await Musers
        .findOne({ userName: msg.userName })
        .select("retweets")
        .then(async result => {
            var retweet_array = [];
            result.retweets.forEach(element => {
                retweet_array.push(element.tweetId);
            });
            console.log("retweeted array", retweet_array);
            //res.status(200).end(JSON.stringify(retweet_array));
            response.status = 200;
            response.data = JSON.stringify(retweet_array);
            return callback(null, response);
        })
        .catch(error => {
            console.log(error);
            //res.end("could not get retweets");
            err.status = 411;
            err.message = "could not get retweets";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;