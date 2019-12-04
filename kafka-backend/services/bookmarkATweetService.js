const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");


const followers = require("../model/followers");
const following = require("../model/following");
const { Musers } = require("../model/Musers");
const { tweets } = require("../model/tweets");


async function handle_request(msg, callback) {

    console.log("Inside bookmarkATweet in kafka backend");
    let response = {};
    let err = {};

    return await Musers
        .find({ userName: msg.userName })
        .select("bookmarked")
        .then(async result => {
            console.log((result[0].bookmarked).length);
            if ((result[0].bookmarked).length === 0) {
                var new_bookmark = {
                    tweetId: msg.tweetId
                }

                return await Musers
                    .update(
                        { userName: msg.userName },
                        { $push: { bookmarked: new_bookmark } },
                        { safe: true }
                    )
                    .then(result1 => {
                        console.log("bookmark successful");
                        //res.end("bookmark successful");
                        response.status = 200;
                        response.message = "bookmark successful";
                        return callback(null, response);
                    })
                    .catch(error => {
                        console.log(error);
                        //res.end("could not bookmark tweet");
                        err.status = 410;
                        err.message = "could not bookmark tweet";
                        err.data = error;
                        return callback(err, null);
                    })
            } else {
                console.log("user have bookmarks");

                var bookmarks_users = [];
                var found = false;
                result[0].bookmarked.forEach(element => {
                    bookmarks_users.push(element.tweetId);
                });

                for (var i = 0; i < bookmarks_users.length; i++) {
                    if (bookmarks_users[i] == msg.tweetId) {
                        found = true;
                        break;
                    }
                }

                if (found === true) {
                    var new_bookmark = {
                        tweetId: msg.tweetId
                    }

                    return await Musers
                        .update(
                            { userName: msg.userName },
                            { $pull: { bookmarked: new_bookmark } },
                            { safe: true }
                        )
                        .then(result1 => {
                            console.log("unbookmark successsful");
                            //res.end("unbookmark successsful");
                            response.status = 200;
                            response.message = "unbookmark successful";
                            return callback(null, response);
                        })
                        .catch(error => {
                            console.log(error);
                            //res.end("could not unbookmark tweet");
                            err.status = 411;
                            err.message = "could not unbookmark tweet";
                            err.data = error;
                            return callback(err, null);
                        })
                } else {

                    var new_bookmark = {
                        tweetId: msg.tweetId
                    }

                    return await Musers
                        .update(
                            { userName: msg.userName },
                            { $push: { bookmarked: new_bookmark } },
                            { safe: true }
                        )
                        .then(result2 => {
                            console.log("bookmark successsful");
                            //res.end("bookmark successsful");
                            response.status = 200;
                            response.message = "bookmark successful";
                            return callback(null, response);
                        })
                        .catch(error => {
                            console.log(error);
                            //res.end("could not unbookmark tweet");
                            err.status = 412;
                            err.message = "could not unbookmark tweet";
                            err.data = error;
                            return callback(err, null);
                        })
                }
            }
        })
        .catch(error => {
            console.log(error);
            //res.end("could not get bookmarks");
            err.status = 413;
            err.message = "could not get bookmarks";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;