var express = require('express');
const _ = require("lodash");
var app = express();
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require('../model/Musers');
var { tweets } = require("../model/tweets");

async function handle_request(msg, callback) {

    console.log("Inside retweetWithComment in kafka backend");
    let response = {};
    let err = {};

    var d = new Date().toString();
    var l = d.split(' ').splice(0, 4).join(' ');

    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();

    l = l + " " + hours + " " + minutes + " " + seconds;
    var new_retweet = new tweets({
        userName: msg.userName,
        firstName: msg.firstName,
        lastName: msg.lastName,
        profileImage: msg.userImage,
        tweetMsg: msg.tweetMsg,
        tweetDate: l,
        tweetMedia: msg.tweetMedia,
        isRetweet: true
    });

    new_retweet.save(async (error, result) => {
        if (error) {
            console.log(error);
            //res.end("could not retweet");
            err.status = 411;
            err.message = "could not retweet";
            err.data = error;
        } else {
            console.log("retweet success");

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

            var parent = {
                parentId: msg.parentId,
                parentUserName: msg.parentUserName,
                parentFirstName: msg.parentFirstName,
                parentLastName: msg.parentLastName,
                parentProfileImage: msg.parentProfileImage,
                parentTweetMsg: msg.parentTweetMsg,
                parentTweetMedia: msg.parentTweetMedia
            }

            return await tweets
                .update(
                    { _id: result._id },
                    {
                        $push: {
                            parentTweetDetails: parent,
                            hashtags: { $each: arr }
                        }
                    },
                    { new: true }
                )
                .then(result2 => {
                    console.log("retweeted successfully");
                    //res.end("retweeted successfully");
                    response.status = 200;
                    response.message = "retweeted successfully";
                    //response.data = JSON.stringify(result);
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    //res.end("could not save parent details");
                    err.status = 410;
                    err.message = "could not save parent details";
                    err.data = error;
                })
        }
    });
};

exports.handle_request = handle_request;