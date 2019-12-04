var express = require('express');
const _ = require("lodash");
var app = express();
const mySqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
var { lists } = require("../model/lists");

async function handle_request(msg, callback) {

    console.log("Inside add new list in kafka backend");
    let response = {};
    let err = {};

    var new_list = new lists({
        userName: msg.userName,
        firstName: msg.firstName,
        lastName: msg.lastName,
        listName: msg.listName,
        description: msg.description
    });

    new_list.save(function (error) {
        if (error) {
            console.log("Unable to create list", error);
            //res.status(411).end("Unable to create list");
            err.status = 411;
            err.message = "Unable to create list";
            err.data = error;
            return callback(err, null);
        }
        console.log("List created successfully");
        //res.status(200).end("List created successfully");
        response.status = 200;
        response.message = "List created successfully";
        return callback(null, response);
    });

};

exports.handle_request = handle_request;