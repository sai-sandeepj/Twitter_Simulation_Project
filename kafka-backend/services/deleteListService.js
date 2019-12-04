const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const { lists } = require("../model/lists");

async function handle_request(msg, callback) {

    console.log("Inside deleteList in kafka backend");
    let response = {};
    let err = {};

    return await lists
        .remove({ _id: msg.listId })
        .then(result => {
            console.log("list deleted");
            //res.end("list deleted");
            response.status = 200;
            response.message = "list deleted";
            return callback(null, response);
        })
        .catch(error => {
            console.log("error in deleting list", error);
            //res.end("error in deleting list");
            err.status = 410;
            err.message = "error in deleting list";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;