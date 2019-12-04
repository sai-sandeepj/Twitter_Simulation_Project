var express = require('express');
const _ = require("lodash");
var app = express();
const bcrypt = require("bcryptjs");
//var { Users } = require('../models/Users');
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require('../model/Musers');
var { lists } = require("../model/lists");

async function handle_request(msg, callback) {

    console.log("Inside subscribeToList in kafka backend");
    let response = {};
    let err = {};

    return await lists
        .findOne({ _id: msg.listId })
        .select()
        .then(async result => {
            console.log(result.subscribers);
            alreadyListSubscriber = false;
            for (var i = 0; i < (result.subscribers).length; i++) {
                if (result.subscribers[i].userName == msg.memberUserName) {
                    alreadyListSubscriber = true;
                    break;
                }
            }
            if (alreadyListSubscriber === true) {
                console.log("user already subscribed");
                //unsubscribe
                var old_subsriber = {
                    userName: msg.memberUserName,
                    firstName: msg.memberFirstName,
                    lastName: msg.memberLastName,
                    profileImage: msg.memberProfileImage
                }
                return await lists
                    .update(
                        { _id: msg.listId },
                        { $pull: { subscribers: old_subsriber } },
                        { new: true }
                    )
                    .then(async result1 => {
                        console.log("unsubsribed from lists");
                        console.log("unsubsribe musers");
                        var musers_subscriber = {
                            listId: msg.listId
                        }
                        return await Musers
                            .update(
                                { userName: msg.memberUserName },
                                { $pull: { subscribed: musers_subscriber } },
                                { new: true })
                            .then(result2 => {
                                console.log("user unsubscribed");
                                //res.end("user unsubscribed");
                                response.status = 200;
                                response.message = "user unsubscribed";
                                return callback(null, response);
                            })
                            .catch(error => {
                                console.log(error);
                                //res.end("cannot remove from musers");
                                err.status = 410;
                                err.message = "cannot remove from musers";
                                err.data = error;
                                return callback(err, null);
                            })
                    })
                    .catch(error => {
                        console.log(error);
                        //res.end("cannot unsubscribe");
                        err.status = 411;
                        err.message = "cannot unsubscribe";
                        err.data = error;
                        return callback(err, null);
                    })
            } else {
                console.log("new subscriber");

                var new_subsriber = {
                    userName: msg.memberUserName,
                    firstName: msg.memberFirstName,
                    lastName: msg.memberLastName,
                    profileImage: msg.memberProfileImage
                }
                return await lists
                    .update(
                        { _id: msg.listId },
                        { $push: { subscribers: new_subsriber } },
                        { new: true }
                    )
                    .then(async result1 => {
                        console.log("added to list table");
                        console.log("adding to musers");
                        var musers_subscriber = {
                            listId: msg.listId
                        }
                        return await Musers
                            .update(
                                { userName: msg.memberUserName },
                                { $push: { subscribed: musers_subscriber } },
                                { new: true })
                            .then(result2 => {
                                console.log("user subscribed");
                                //res.end("user subscribed");
                                response.status = 200;
                                response.message = "user subscribed";
                                return callback(null, response);
                            })
                            .catch(error => {
                                console.log(error);
                                //res.end("cannot add to musers");
                                err.status = 412;
                                err.message = "cannot add to musers";
                                err.data = error;
                                return callback(err, null);
                            })
                    })
                    .catch(error => {
                        console.log(error);
                        //res.end("cannot subscribe");
                        err.status = 413;
                        err.message = "cannot subscribe";
                        err.data = error;
                        return callback(err, null);
                    })
            }
        })
        .catch(error => {
            console.log(error);
            //res.end("cannot get subscribers list");
            err.status = 414;
            err.message = "cannot get subscribers list";
            err.data = error;
            return callback(err, null);
        })

};

exports.handle_request = handle_request;