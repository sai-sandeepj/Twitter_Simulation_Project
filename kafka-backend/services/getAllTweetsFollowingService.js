const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const { Musers } = require("../model/Musers");
const { tweets } = require("../model/tweets");

async function handle_request(msg, callback) {

    console.log("Inside getAllTweetsFollowing in kafka backend");
    let response = {};
    let err = {};

    return await Musers
        .findOne({ userName: msg.userName })
        .select("following")
        .then(async result => {
            var following_array = [];
            following_array.push(msg.userName);

            result.following.forEach(element => {
                following_array.push(element.userName);
            });

            return await tweets
                .find({ userName: { $in: following_array } })
                .select()
                .sort({ tweetDate: -1 })
                .then(async result2 => {
                    console.log(result2);
                    //res.end(JSON.stringify(result2));
                    response.status = 200;
                    //response.message = "followed successful";
                    response.data = JSON.stringify(result2);
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    //res.end("could not get tweets");
                    err.status = 410;
                    err.message = "couldn't get tweets" + error;
                    err.data = error;
                    return callback(err, null);
                })
        })
        .catch(error => {
            console.log(error);
            //res.end("Could not get user following tweets");
            err.status = 411;
            err.message = "Could not get user following tweets";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;