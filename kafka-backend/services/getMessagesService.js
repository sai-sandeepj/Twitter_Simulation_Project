const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const { Musers } = require("../model/Musers");
const { lists } = require("../model/lists");
const { messages } = require("../model/messages");

async function handle_request(msg, callback) {

    console.log("Inside getMessages in kafka backend");
    let response = {};
    let err = {};

    return await messages.find({
        $and: [
            { $or: [{ "sender.senderUserName": msg.senderUserName }, { "sender.senderUserName": msg.receiverUserName }] },
            { $or: [{ "receiver.receiverUserName": msg.senderUserName }, { "receiver.receiverUserName": msg.receiverUserName }] }
        ]
    })
        .select()
        .then(result => {
            console.log("messages retreived");
            //res.end(JSON.stringify(result));
            response.status = 200;
            response.message = "messages retreived";
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