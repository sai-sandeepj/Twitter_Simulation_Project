var express = require('express');
const _ = require("lodash");
var app = express();
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require('../model/Musers');
var { tweets } = require("../model/tweets");

async function handle_request(msg, callback) {

    console.log("Inside addNewTweet in kafka backend");
    let response = {};
    let err = {};

    var x = msg.tweetMsg;
    var separators = [" ", "\\+", "-", "\\(", "\\)", "\\*", "/", ":", "\\?"];
    var tokens = x.split(new RegExp(separators.join("|"), "g"));
    console.log("tokens", tokens);

    var arr = [];
    for (var index = 0; index < tokens.length; index++) {
        if (tokens[index].indexOf("#") == 0) {
            console.log("hash", tokens[index]);
            arr.push(tokens[index]);
        }
    }

    console.log("------", arr);
    var d = new Date().toString();
    var l = d.split(' ').splice(0, 4).join(' ');

    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();

    l = l + " " + hours + " " + minutes + " " + seconds;

    var new_tweet = new tweets({
        userName: msg.userName,
        firstName: msg.firstName,
        lastName: msg.lastName,
        profileImage: msg.userImage,
        tweetMsg: msg.tweetMsg,
        tweetDate: l,
        tweetMedia: msg.tweetMedia,
        isRetweet: false,
        parentId: msg.parentId,
    });


    new_tweet.save(async (error, result) => {
        if (error) {
            console.log("Unable to tweet", error);
            //res.status(411).end("Unable to tweet");
            err.status = 411;
            err.message = "Unable to tweet";
            err.data = error;
            return callback(err, null);
        } else {
            console.log("Tweet success");
            return await tweets
                .update(
                    { _id: result._id },
                    { $push: { hashtags: { $each: arr } } },
                    { upsert: true }
                )
                .then(result2 => {
                    console.log("added to hastag", result2);
                    //res.end(JSON.stringify("tweet successfully saved"));
                    response.status = 200;
                    response.message = "Tweeted successfully";
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    //res.end("could not save tweet");
                    err.status = 411;
                    err.message = "could not save tweet";
                    err.data = error;
                    return callback(err, null);
                })
        }
    });

};

exports.handle_request = handle_request;