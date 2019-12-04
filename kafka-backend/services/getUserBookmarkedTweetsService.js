const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");


const { Musers } = require("../model/Musers");
const { tweets } = require("../model/tweets");

async function handle_request(msg, callback) {

    console.log("Inside getUserBookmarkedTweets in kafka backend");
    let response = {};
    let err = {};

    return await Musers
        .findOne({ userName: msg.userName })
        .select("bookmarked")
        .then(async result => {
            var bookmarked_array = [];
            console.log(result);

            result.bookmarked.forEach(element => {
                bookmarked_array.push(element.tweetId);
            });

            console.log("--------------");
            console.log(bookmarked_array);



            return await tweets
                .find({ _id: { $in: bookmarked_array } })
                .select()
                .sort({ tweetDate: -1 })
                .then(async result2 => {
                    console.log(result2);
                    //res.status(200).end(JSON.stringify(result2));
                    response.status = 200;
                    response.data = JSON.stringify(result2);
                    return callback(null, response);
                })
                .catch(error => {
                    console.log("could not get tweets", error);
                    //return res.status(411).end("could not get tweets");
                    err.status = 410;
                    err.message = "could not get tweets";
                    err.data = error;
                    return callback(err, null);
                });
        })
        .catch(error => {
            console.log("could not get following", error);
            //return res.status(411).end("could not get following");
            err.status = 411;
            err.message = "could not get following";
            err.data = error;
            return callback(err, null);
        });
};

exports.handle_request = handle_request;