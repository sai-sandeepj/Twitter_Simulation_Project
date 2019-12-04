const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
const { Musers } = require("../model/Musers");


async function handle_request(msg, callback) {

    console.log("Inside find user in kafka backend");
    let response = {};
    let err = {};

    return await Musers
        .find({
            $or: [
                { firstName: { "$regex": new RegExp(msg.findName) } },
                { lastName: { "$regex": new RegExp(msg.findName) } },
                { userName: { "$regex": new RegExp(msg.findName) } }
            ]
        })
        .select(['userName', 'firstName', 'lastName', 'profileImage', '-_id'])
        .then(result => {
            console.log(result);
            //res.end(JSON.stringify(result));
            response.status = 200;
            response.message = "user found";
            response.data = JSON.stringify(result);
            return callback(null, response);
        })
        .catch(error => {
            console.log("could not find users", error);
            //return res.end("could not find users");
            err.status = 410;
            err.message = "could not find users";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;