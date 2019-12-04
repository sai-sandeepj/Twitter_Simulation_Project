var express = require('express');
const _ = require("lodash");
var app = express();
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require('../model/Musers');
var { tweets } = require("../model/tweets");

async function handle_request(msg, callback) {

    console.log("Inside likeATweet in kafka backend");
    let response = {};
    let err = {};

    return await tweets
        .findOne({
            _id: msg.tweetId
        })
        .select("likes")
        .then(async result => {
            //console.log("result", result);

            var likes_users = [];
            var found = false;
            result.likes.forEach(element => {
                likes_users.push(element.userName);
            });
            //console.log(likes_users);
            if (likes_users.includes(msg.userName)) {
                found = true;
            }

            if (found === true) {
                var new_like = {
                    userName: msg.userName,
                    firstName: msg.firstName,
                    lastName: msg.lastName,
                    aboutMe: msg.aboutMe,
                    profileImage: msg.profileImage
                }

                return await tweets
                    .update(
                        { _id: msg.tweetId },
                        {
                            $pull: { likes: new_like }
                        },
                        { safe: true }
                    )
                    .then(async result1 => {
                        console.log("unliked", result1);

                        var unliked_tweet = {
                            _id: msg.tweetId
                        }

                        return await Musers
                            .update(
                                { userName: msg.userName },
                                { $pull: { liked: unliked_tweet } }
                            )
                            .then(result2 => {
                                console.log(result2);
                                //res.end("unliked");
                                response.status = 200;
                                response.message = "unliked";
                                //response.data = result4;
                                return callback(null, response);
                            })
                            .catch(error => {
                                console.log(error);
                                //res.end("could not perform unlike" + error);
                                err.status = 410;
                                err.message = "could not perform unlike" + error;
                                err.data = error;
                                return callback(err, null);
                            })
                    })
                    .catch(error => {
                        console.log(error);
                        //res.end("could not perform unlike" + error);
                        err.status = 411;
                        err.message = "could not perform unlike" + error;
                        err.data = error;
                        return callback(err, null);
                    })
            } else {
                console.log("need to like a tweet");

                var new_like = {
                    userName: msg.userName,
                    firstName: msg.firstName,
                    lastName: msg.lastName,
                    aboutMe: msg.aboutMe,
                    profileImage: msg.profileImage
                }

                return await tweets
                    .update(
                        { _id: msg.tweetId },
                        {
                            $push: { likes: new_like }
                        },
                        { new: true }
                    )
                    .then(async result3 => {
                        console.log("liked", result3);

                        var liked_tweet = {
                            tweetId: msg.tweetId
                        }

                        return await Musers
                            .update(
                                { userName: msg.userName },
                                { $push: { liked: liked_tweet } },
                                { new: true }
                            )
                            .then(async result4 => {
                                console.log(result4);
                                //res.end("Tweet liked successfully");
                                response.status = 200;
                                response.message = "Tweet liked successfully";
                                //response.data = result4;
                                return callback(null, response);
                            })
                            .catch(error => {
                                console.log(error);
                                //res.end("cannot like tweet");
                                err.status = 412;
                                err.message = "cannot like tweet" + error;
                                err.data = error;
                                return callback(err, null);
                            })
                    })
                    .catch(error => {
                        console.log(error);
                        //res.end("cannot like tweet");
                        err.status = 413;
                        err.message = "cannot like tweet" + error;
                        err.data = error;
                        return callback(err, null);
                    })
            }
        })
        .catch(error => {
            console.log(error);
            //res.status(411).end("cannot get likes");
            err.status = 414;
            err.message = "cannot get likes" + error;
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;