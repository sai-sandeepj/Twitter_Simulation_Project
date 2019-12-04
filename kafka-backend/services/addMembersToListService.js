var express = require('express');
const _ = require("lodash");
var app = express();
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { Musers } = require('../model/Musers');
var { lists } = require("../model/lists");

async function handle_request(msg, callback) {

    console.log("Inside add members to list in kafka backend");
    let response = {};
    let err = {};

    return await lists
        .findOne({ _id: msg.listId })
        .select()
        .then(async result => {
            console.log(result);

            if (((result.members).length) != 0) {

                alreadyListMember = false;
                for (var i = 0; i < (result.members).length; i++) {
                    if (await result.members[i].userName === msg.memberUserName) {
                        alreadyListMember = true;
                        break;
                    }
                }
                if (alreadyListMember === true) {
                    console.log("User is already in list");
                    res.end("User is already added to list");
                } else {
                    var new_member = {
                        userName: msg.memberUserName,
                        firstName: msg.memberFirstName,
                        lastName: msg.memberLastName,
                        profileImage: msg.memberProfileImage
                    }
                    return await lists
                        .findByIdAndUpdate(
                            msg.listId,
                            {
                                $push: { members: new_member }
                            },
                            { new: true }
                        )
                        .then(async result => {
                            console.log("member added to lists table");

                            var users_new_member = {
                                listId: msg.listId
                            }

                            return await Musers
                                .update(
                                    { userName: msg.memberUserName },
                                    {
                                        $push: { memberOf: users_new_member }
                                    },
                                    { new: true }
                                )
                                .then(result1 => {
                                    console.log("User added to list");
                                    //res.end("user added to list");
                                    response.status = 200;
                                    response.message = "user added to list";
                                    return callback(null, response);
                                })
                                .catch(error => {
                                    console.log(error);
                                    //res.end(JSON.stringify(error));
                                    err.status = 400;
                                    err.message = "cannot add members to list";
                                    return callback(err, null);
                                })
                        })
                        .catch(error => {
                            console.log(error);
                            //res.end(JSON.stringify(error));
                            err.status = 410;
                            err.message = "cannot add members to list";
                            return callback(err, null);
                        })
                }

            } else {
                var new_member = {
                    userName: msg.memberUserName,
                    firstName: msg.memberFirstName,
                    lastName: msg.memberLastName,
                    profileImage: msg.memberProfileImage
                }

                return await lists
                    .findByIdAndUpdate(
                        msg.listId,
                        {
                            $push: { members: new_member }
                        },
                        { new: true }
                    )
                    .then(async result => {
                        console.log("member added to lists table");

                        var users_new_member = {
                            listId: msg.listId
                        }

                        return await Musers
                            .update(
                                { userName: msg.memberUserName },
                                {
                                    $push: { memberOf: users_new_member }
                                },
                                { new: true }
                            )
                            .then(result1 => {
                                console.log("User added to list");
                                //res.end("user added to list");
                                response.status = 200;
                                response.message = "user added to list";
                                return callback(null, response);
                            })
                            .catch(error => {
                                console.log(error);
                                //res.end(JSON.stringify(error));
                                err.status = 411;
                                err.message = "cannot add members to list";
                                return callback(err, null);
                            })
                    })
                    .catch(error => {
                        console.log(error);
                        //res.end(JSON.stringify(error));
                        err.status = 412;
                        err.message = "cannot add members to list";
                        return callback(err, null);
                    })
            }
        })
        .catch(error => {
            console.log(error);
            //res.end(JSON.stringify(error));
            err.status = 413;
            err.message = "cannot add members to list";
            return callback(err, null);
        })
};

exports.handle_request = handle_request;