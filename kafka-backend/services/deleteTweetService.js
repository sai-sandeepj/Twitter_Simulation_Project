const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { tweets } = require("../model/tweets");
const { Musers } = require("../model/Musers");

async function handle_request(msg, callback) {

    console.log("Inside delete tweet in kafka backend");
    let response = {};
    let err = {};

    return await Musers
        .updateMany(
            //{'bookmarked.tweetId': msg.tweetId},
            {},
            { $pull: { "bookmarked": { tweetId: msg.tweetId } } },
            { new: true }
        )
        .then(async result => {
            console.log("tweet bookmarked deleted from musers");

            return await Musers
                .updateMany(
                    {},
                    { $pull: { "liked": { tweetId: msg.tweetId } } },
                    { new: true }
                )
                .then(async result1 => {
                    console.log("tweet liked deleted from musers");

                    return await Musers
                        .updateMany(
                            {},
                            { $pull: { "retweets": { tweetId: msg.tweetId } } },
                            { new: true }
                        )
                        .then(async result2 => {
                            console.log("tweet retweets deleted from musers");

                            return await tweets
                                .find({ _id: msg.tweetId })
                                .remove()
                                .then(result3 => {
                                    console.log("tweet deleted");
                                    //res.end("tweet deleted");
                                    response.status = 200;
                                    response.message = "tweet deleted";
                                    return callback(null, response);
                                })
                                .catch(error => {
                                    console.log(error);
                                    //res.end("could not delete from tweets");
                                    err.status = 410;
                                    err.message = "could not delete from tweets";
                                    err.data = error;
                                    return callback(err, null);
                                })
                        })
                        .catch(error => {
                            console.log(error);
                            //res.end("tweet retweets deleted from musers");
                            err.status = 411;
                            err.message = "tweet retweets deleted from musers";
                            err.data = error;
                            return callback(err, null);
                        })
                })
                .catch(error => {
                    console.log(error);
                    //res.end("could not delete liked musers");
                    err.status = 412;
                    err.message = "could not delete liked musers";
                    err.data = error;
                    return callback(err, null);
                })
        })
        .catch(error => {
            console.log(error);
            //res.end("could not delete tweet");
            err.status = 413;
            err.message = "could not delete tweet";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;