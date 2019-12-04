const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { tweets } = require("../model/tweets");

async function handle_request(msg, callback) {

    console.log("Inside getTop5RetweetedTweets in kafka backend");
    let response = {};
    let err = {};

    tweets.aggregate([
        {
            "$project": {
                "_id": 1,
                "userName": 1,
                "retweetNoComment": 1,
                "length": { "$size": "$retweetNoComment" }
            }
        },
        { "$sort": { "length": -1 } },
        {
            "$project": {
                "_id": 1,
                "userName": 1,
                "retweetNoComment": 1,
            }
        }
    ])
        .limit(5)
        .then(result => {
            console.log(result);
            //res.end(JSON.stringify(result));
            response.status = 200;
            response.message = "Top 5 Retweeted Tweets reterived";
            response.data = JSON.stringify(result);
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