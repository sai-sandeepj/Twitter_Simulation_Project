var express = require('express');
const _ = require("lodash");
var app = express();
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require('../model/Musers');
var { tweets } = require("../model/tweets");

async function handle_request(msg, callback) {

    console.log("Inside get user tweets in kafka backend");
    let response = {};
    let err = {};

    return await tweets
        .find({ userName: msg.userName })
        .select()
        .then(result => {
            console.log(result);
            //res.status(200).end(JSON.stringify(result));
            response.status = 200;
            response.data = JSON.stringify(result);
            return callback(null, response);
        })
        .catch(error => {
            console.log("could not get tweets");
            err.status = 411;
            err.message = "could not get tweets";
            err.data = error;
            return callback(err, null);
        });

};

exports.handle_request = handle_request;