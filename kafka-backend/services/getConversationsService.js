const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const { Musers } = require("../model/Musers");
const { tweets } = require("../model/tweets");
const { messages } = require("../model/messages");

async function handle_request(msg, callback) {

    console.log("Inside getConversations in kafka backend");
    let response = {};
    let err = {};

    return await messages.find({
        $or: [{ "sender.senderUserName": msg.userName }, { "receiver.receiverUserName": msg.userName }]

    })
        .select()
        .then(result => {
            console.log("got conversations");
            //res.end(JSON.stringify(result));
            response.status = 200;
            response.message = "got conversations";
            response.data = JSON.stringify(result);
            return callback(null, response);
        })
        .catch(error => {
            console.log(error);
            //res.end("could not get messages");
            err.status = 410;
            err.message = "could not get messages";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;