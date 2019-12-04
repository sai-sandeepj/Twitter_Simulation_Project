const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { lists } = require("../model/lists");

async function handle_request(msg, callback) {

    console.log("Inside edit list in kafka backend");
    let response = {};
    let err = {};

    return await lists
        .update(
            { _id: msg.listId },
            {
                $set: {
                    listName: msg.listName,
                    description: msg.description
                }
            },
            { new: true }
        )
        .then(result => {
            console.log("list edited successfully");
            //res.end("list edited successfully");
            response.status = 200;
            response.message = "list edited successfully";
            return callback(null, response);
        })
        .catch(err => {
            console.log(err);
            //res.end("could not get list");
            err.status = 410;
            err.message = "could not get list";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;