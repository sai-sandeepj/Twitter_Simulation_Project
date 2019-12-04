const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const { Musers } = require("../model/Musers");
const { lists } = require("../model/lists");

async function handle_request(msg, callback) {

    console.log("Inside getListsByUserName in kafka backend");
    let response = {};
    let err = {};

    return await lists
        .find({ userName: msg.userName })
        .select()
        .then(result => {
            console.log("got lists");
            //res.end(JSON.stringify(result));
            response.status = 200;
            response.message = "list by user name reterived";
            response.data = JSON.stringify(result);
            return callback(null, response);
        })
        .catch(error => {
            console.log(error);
            //res.end(JSON.stringify(error));
            err.status = 410;
            err.message = "cannot get list by user name";
            err.data = error;
            return callback(err, null);
        })

};

exports.handle_request = handle_request;