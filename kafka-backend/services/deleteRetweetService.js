const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { tweets } = require("../model/tweets");
const { Musers } = require("../model/Musers");

async function handle_request(msg, callback) {

    console.log("Inside delete retweet in kafka backend");
    let response = {};
    let err = {};

    return await tweets
        .update(
            { _id: msg.tweetId },
            { $pull: { "retweetNoComment": { userName: msg.userName } } },
            { new: true }
        )
        .then(async result => {
            console.log("retweet deleted");

            return await Musers
                .update(
                    { userName: msg.userName },
                    { $pull: { "retweets": { tweetId: msg.tweetId } } },
                    { new: true }
                )
                .then(result1 => {
                    console.log("retweet deleted");
                    //res.end("retweet deleted");
                    response.status = 200;
                    response.message = "retweet deleted";
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    //res.end("could not delete musers retweets");
                    err.status = 410;
                    err.message = "could not delete musers retweets";
                    err.data = error;
                    return callback(err, null);
                })

            //res.end("retweet deleted");
        })
        .catch(error => {
            console.log(error);
            //res.end("could not delete retweet");
            err.status = 411;
            err.message = "could not delete retweet";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;