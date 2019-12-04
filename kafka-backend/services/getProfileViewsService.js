const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
const { Musers } = require("../model/Musers");


async function handle_request(msg, callback) {

    console.log("Inside getProfileViews in kafka backend");
    let response = {};
    let err = {};

    return await Musers
        .findOne({ userName: msg.userName })
        .select()
        .then(result => {
            console.log(result);
            //res.end(JSON.stringify(result.views));
            response.status = 200;
            response.message = "user profile views reterived";
            response.data = JSON.stringify(result.views);
            return callback(null, response);
        })
        .catch(error => {
            console.log(error);
            //res.end("could not get musers");
            err.status = 410;
            err.message = "could not get musers";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;