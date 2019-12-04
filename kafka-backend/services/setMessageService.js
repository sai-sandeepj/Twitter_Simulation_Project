var express = require('express');
const _ = require("lodash");
var app = express();
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require('../model/Musers');
var { tweets } = require("../model/tweets");
var { messages } = require("../model/messages");


async function handle_request(msg, callback) {

    console.log("Inside setMessage in kafka backend");
    let response = {};
    let err = {};

    return await messages.find({
        $and: [
            { $or: [{ "sender.senderUserName": msg.senderUserName }, { "sender.senderUserName": msg.receiverUserName }] },
            { $or: [{ "receiver.receiverUserName": msg.senderUserName }, { "receiver.receiverUserName": msg.receiverUserName }] }
        ]
    })
        .select()
        .then(async result => {
            console.log("got messages");
            console.log(result);

            if (result.length === 0) {
                console.log("create new document");

                var new_conversation = new messages({
                    "sender.senderUserName": msg.senderUserName,
                    "sender.senderFirstName": msg.senderFirstName,
                    "sender.senderLastName": msg.senderLastName,
                    "sender.senderProfileImage": msg.senderProfileImage,

                    "receiver.receiverUserName": msg.receiverUserName,
                    "receiver.receiverFirstName": msg.receiverFirstName,
                    "receiver.receiverLastName": msg.receiverLastName,
                    "receiver.receiverProfileImage": msg.receiverProfileImage
                })

                new_conversation.save(async (error, result1) => {
                    if (error) {
                        console.log(error);
                        //res.end("could not create new conversation");
                        err.status = 410;
                        err.message = "could not create new conversation";
                        err.data = error;
                        return callback(err, null);
                    } else {
                        console.log("conversation created");

                        var new_conversation = {
                            sent_by: msg.senderUserName,
                            message: msg.message
                        }

                        return await messages
                            .update(
                                { _id: result1._id },
                                { $push: { messages: new_conversation } },
                                { new: true }
                            )
                            .then(result2 => {
                                console.log("message sent");
                                //res.end("message sent");
                                response.status = 200;
                                response.message = "message sent";
                                return callback(null, response);
                            })
                            .catch(error => {
                                console.log(error);
                                //res.end("could not append to message");
                                err.status = 410;
                                err.message = "could not append to message";
                                err.data = error;
                                return callback(err, null);
                            })
                    }
                });
            } else {
                console.log("append to document");

                var new_message = {
                    sent_by: msg.senderUserName,
                    message: msg.message
                }

                return await messages
                    .update(
                        { _id: result[0]._id },
                        { $push: { messages: new_message } },
                        { new: true }
                    )
                    .then(result3 => {
                        console.log("message sent");
                        //res.end("message sent");
                        response.status = 200;
                        response.message = "message sent";
                        return callback(null, response);
                    })
                    .catch(error => {
                        console.log(error);
                        //res.end("could not append to messages");
                        err.status = 411;
                        err.message = "could not append to messages";
                        err.data = error;
                        return callback(err, null);
                    })
            }
        })
        .catch(error => {
            console.log(error);
            //res.end("could not get messages");
            err.status = 412;
            err.message = "could not get messages";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;