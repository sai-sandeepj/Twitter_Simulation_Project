const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { tweets } = require("../model/tweets");

async function handle_request(msg, callback) {

    console.log("Inside getTweets in kafka backend");
    let response = {};
    let err = {};

    return await tweets
        .findOne({ _id: msg.tweetId })
        .select()
        .then(async result => {
            console.log(result);
            //res.end(JSON.stringify(result));

            var d = new Date().toString();
            var l = d.split(' ').splice(0, 4).join(' ');

            var same_day = false;

            for (var i = 0; i < (result.tweetViews).length; i++) {
                if ((result.tweetViews[i].viewDate) === l) {
                    same_day = true;
                    console.log(same_day);
                    array_day = i;
                    array_day_counter = result.tweetViews[i].viewCounter;
                    console.log("----" + array_day);
                    console.log("****" + array_day_counter);
                    break;
                }
            }

            if (same_day === true) {
                console.log("increase counter");
                //res.end("increase counter");

                return await tweets
                    .update(
                        { _id: msg.tweetId, 'tweetViews.viewDate': l },
                        { $set: { "tweetViews.$.viewCounter": (array_day_counter + 1) } },
                        { new: true }
                    )
                    .then(result => {
                        console.log(result);
                        //res.end(JSON.stringify(result));
                        response.status = 200;
                        //response.message = "Top 10 viewed Tweets reterived";
                        response.data = JSON.stringify(result);
                        return callback(null, response);
                    })
                    .catch(error => {
                        console.log(error);
                        //res.end("could not increase counter");
                        err.status = 410;
                        err.message = "could not increase counter";
                        err.data = error;
                        return callback(err, null);
                    })

            } else {
                console.log("create new date");
                //res.end("create new date");

                var new_date = {
                    viewDate: l,
                    viewCounter: 1,
                    viewTimeStamp: Date.now()
                }

                return await tweets
                    .update(
                        { _id: msg.tweetId },
                        { $push: { tweetViews: new_date } },
                        { new: true }
                    )
                    .then(result10 => {
                        console.log("new date created");
                        //res.end(JSON.stringify(result10));
                        response.status = 200;
                        //response.message = "Top 10 viewed Tweets reterived";
                        response.data = JSON.stringify(result10);
                        return callback(null, response);
                    })
                    .catch(error => {
                        console.log(error);
                        //res.end("could not create new field");
                        err.status = 411;
                        err.message = "could not create new field";
                        err.data = error;
                        return callback(err, null);
                    })

            }

        })
        .catch(error => {
            console.log(error);
            //res.end("could not get tweet");
            err.status = 412;
            err.message = "could not get tweet";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;