const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { tweets } = require("../model/tweets");
const { lists } = require("../model/lists");

async function handle_request(msg, callback) {

    console.log("Inside getTweetsOfMembersInList in kafka backend");
    let response = {};
    let err = {};

    return await lists
        .findOne({ _id: msg.listId })
        .select("members.userName")
        .then(async result => {
            console.log(result);

            var members = [];
            for (var i = 0; i < (result.members).length; i++) {
                members.push(result.members[i].userName);
            }

            return await tweets
                .find({ userName: { $in: members } })
                .select()
                .then(result1 => {
                    console.log(result1);
                    //res.end(JSON.stringify(result1));
                    //response.status = 200;
                    response.data = JSON.stringify(result1);
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    err.status = 410;
                    err.message = "could not get tweets";
                    err.data = error;
                    return callback(err, null);
                })

        })
        .catch(error => {
            console.log(error);
            err.status = 411;
            err.message = "could not get tweets from lists";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;