var express = require('express');
const _ = require("lodash");
var app = express();
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require('../model/Musers');
var { tweets } = require("../model/tweets");

async function handle_request(msg, callback) {

    console.log("Inside addCommentOnTweet in kafka backend");
    let response = {};
    let err = {};

    var new_comment = {
        userName: msg.userName,
        firstName: msg.firstName,
        lastName: msg.lastName,
        commentTime: Date.now(),
        comment: msg.comment,
        commentMedia: msg.commentMedia,
        profileImage: msg.userImage
    };

    return await tweets
        .findByIdAndUpdate(
            msg.tweetId,
            {
                $push: { comments: new_comment }
            },
            { new: true }
        )
        .then(result => {
            console.log("comment added", result);
            //res.end("comment added");
            response.status = 200;
            response.message = "comment added";
            response.data = result;
            return callback(null, response);
        })
        .catch(error => {
            console.log("could not get tweets");
            //return res.end("could not get tweets" + err);
            err.status = 410;
            err.message = "could not add comment" + error;
            err.data = error;
            return callback(err, null);
        });

};

exports.handle_request = handle_request;