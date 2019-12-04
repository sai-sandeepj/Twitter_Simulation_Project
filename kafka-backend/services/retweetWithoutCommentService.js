var express = require('express');
const _ = require("lodash");
var app = express();
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require('../model/Musers');
var { tweets } = require("../model/tweets");

async function handle_request(msg, callback) {

    console.log("Inside retweetWithoutComment in kafka backend");
    let response = {};
    let err = {};

    var new_retweet = {
        userName: msg.userName,
        firstName: msg.firstName,
        lastName: msg.lastName,
        aboutMe: msg.aboutMe,
        profileImage: msg.userImage
    }

    return await tweets
        .update(
            { _id: msg.tweetId },
            { $push: { retweetNoComment: new_retweet } },
            { new: true })
        .then(async result => {
            console.log("retweeted in tweets");

            var musers_retweet = {
                tweetId: msg.tweetId,
                retweetTime: Date.now()
            };

            return await Musers
                .update(
                    { userName: msg.userName },
                    { $push: { retweets: musers_retweet } },
                    { new: true }
                )
                .then(result1 => {
                    console.log("retweeted successfully");
                    //res.end("retweeted successfully");
                    response.status = 200;
                    response.message = "retweeted successfully";
                    //response.data = JSON.stringify(result);
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    //res.end("could not add to musers");
                    err.status = 410;
                    err.message = "could not add to musers";
                    err.data = error;
                })
        })
        .catch(error => {
            console.log(error);
            //res.end("could not retweet");
            err.status = 411;
            err.message = "could not retweet";
            err.data = error;
        })
};

exports.handle_request = handle_request;