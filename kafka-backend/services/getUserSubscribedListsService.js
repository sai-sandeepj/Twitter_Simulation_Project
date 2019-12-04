const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { Musers } = require("../model/Musers");
const { lists } = require("../model/lists");

async function handle_request(msg, callback) {

    console.log("Inside getUserSubscribedLists in kafka backend");
    let response = {};
    let err = {};

    return await Musers
        .findOne({ userName: msg.userName })
        .select(["subscribed", "-_id"])
        .then(async result1 => {
            console.log(result1.subscribed);

            var subscribed_lists = [];

            for (var i = 0; i < (result1.subscribed).length; i++) {
                subscribed_lists.push(result1.subscribed[i].listId);
            }
            console.log(subscribed_lists);

            return await lists
                .find({ _id: { $in: subscribed_lists } })
                .select()
                .then(result2 => {
                    console.log(result2);
                    //res.end(JSON.stringify(result2));
                    response.status = 200;
                    response.data = JSON.stringify(result2);
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    //res.end("could not get lists");
                    err.status = 411;
                    err.message = "could not get lists";
                    err.data = error;
                    return callback(err, null);
                })

        })
        .catch(error => {
            console.log(error);
            //res.end("cannot get user from musers");
            err.status = 412;
            err.message = "cannot get users from musers";
            err.data = error;
            return callback(err, null);
        })

};

exports.handle_request = handle_request;