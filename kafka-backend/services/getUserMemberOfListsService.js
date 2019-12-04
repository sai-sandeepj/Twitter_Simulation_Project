const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { Musers } = require("../model/Musers");
const { lists } = require("../model/lists");

async function handle_request(msg, callback) {

    console.log("Inside getUserMemberOfLists in kafka backend");
    let response = {};
    let err = {};

    return await Musers
        .findOne({ userName: msg.userName })
        .select(["memberOf", "-_id"])
        .then(async result1 => {
            console.log(result1.memberOf);

            var memberOf_lists = [];
            for (var i = 0; i < (result1.memberOf).length; i++) {
                memberOf_lists.push(result1.memberOf[i].listId);
            }
            console.log(memberOf_lists);

            return await lists
                .find({ _id: { $in: memberOf_lists } })
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
            //res.end("cannot get members from musers");
            err.status = 412;
            err.message = "cannot get members from musers";
            err.data = error;
            return callback(err, null);
        })

};

exports.handle_request = handle_request;