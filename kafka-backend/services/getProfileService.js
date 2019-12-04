const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
const redis = require("redis");
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const client = redis.createClient();

const followers = require("../model/followers");
const following = require("../model/following");
const { Musers } = require("../model/Musers");


async function handle_request(msg, callback) {

    console.log("Inside get profile in kafka backend");
    let response = {};
    let err = {};

    const RedisKey = msg.userName;
    console.log("RedisKey", RedisKey);

    return client.get(RedisKey, (error, result) => {
        if (result) {
            //res.status(200).end(JSON.stringify(result));

            response.status = 200;
            response.message = "user profile reterived";
            response.data = result;
            return callback(null, response);
        } else {
            mysqlPool.getConnection(async (error, conn) => {
                if (error) {
                    console.log("Error while creating connection");
                    err.status = 500;
                    err.message = "Error while creating connection";
                    err.data = error;
                    return callback(err, null);
                } else {
                    const sql1 =
                        "SELECT * FROM users WHERE userName= " +
                        mysql.escape(msg.userName);

                    conn.query(sql1, (error, result1) => {
                        if (error) {
                            console.log("Error in retrieving profile data");
                            err.status = 400;
                            err.message = "Error in retrieving profile data";
                            err.data = error;
                            return callback(err, null);
                        } else {
                            const { UN } = msg;
                            const UE = result1.userEmail;
                            client.setex(RedisKey, 3600, JSON.stringify(result1));
                            console.log("Profile data: ", result1);


                            response.status = 200;
                            response.message = "user profile reterived";
                            response.data = JSON.stringify(result1);
                            return callback(null, response);
                        }
                    });
                }
            });
        }
    });

};

exports.handle_request = handle_request;
