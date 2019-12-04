var express = require('express');
const _ = require("lodash");
var app = express();
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require('../model/Musers');
var { tweets } = require("../model/tweets");

async function handle_request(msg, callback) {

    console.log("Inside searchByHashTag in kafka backend");
    let response = {};
    let err = {};

    return await tweets
        //.find({hashtags: msg.hashTag})
        .find({ hashtags: { "$regex": msg.hashTag, "$options": "i" } })
        .select()
        .then(result => {
            console.log("got hashtag tweets");
            //res.end(JSON.stringify(result));
            response.status = 200;
            response.message = "got hashtag tweets";
            response.data = JSON.stringify(result);
            return callback(null, response);
        })
        .catch(error => {
            console.log(error);
            //res.end("couldn't get hastag tweets");
            err.status = 410;
            err.message = "couldn't get hastag tweets";
            err.data = error;
            return callback(err, null);

        })
};

exports.handle_request = handle_request;