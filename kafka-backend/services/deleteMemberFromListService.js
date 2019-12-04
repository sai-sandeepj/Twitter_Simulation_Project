const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { lists } = require("../model/lists");
const { Musers } = require("../model/Musers");

async function handle_request(msg, callback) {

    console.log("Inside delete members from List in kafka backend");
    let response = {};
    let err = {};

    var delete_member = {
        userName: msg.memberUserName,
        firstName: msg.memberFirstName,
        lastName: msg.memberLastName,
        profileImage: msg.memberProfileImage
    }

    return await lists
        .update(
            { _id: msg.listId },
            { $pull: { members: delete_member } },
            { new: true })
        .then(async result1 => {
            console.log("deleted from lists");

            var muser_member = {
                listId: msg.listId
            }

            return await Musers
                .update(
                    { userName: msg.memberUserName },
                    { $pull: { memberOf: muser_member } },
                    { new: true })
                .then(result2 => {
                    console.log("User deleted from list");
                    //res.end("User deleted from list");
                    response.status = 200;
                    response.message = "User deleted from list";
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    //res.end("could not delete member from list");
                    err.status = 410;
                    err.message = "could not delete member from list";
                    err.data = error;
                    return callback(err, null);
                })
        })
        .catch(error => {
            console.log(error);
            //res.end("could not delete members fro list");
            err.status = 411;
            err.message = "could not delete member from list";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;