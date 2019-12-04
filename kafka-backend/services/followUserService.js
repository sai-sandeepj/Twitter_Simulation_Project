const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const { Musers } = require("../model/Musers");


async function handle_request(msg, callback) {

    console.log("Inside follow user in kafka backend");
    let response = {};
    let err = {};

    var new_following = {
        userName: msg.followUserName,
        firstName: msg.followFirstName,
        lastName: msg.followLastName,
        aboutMe: msg.followAboutMe,
        profileImage: msg.followProfileImage
    }

    return await Musers
        .update(
            { userName: msg.userName },
            { $push: { following: new_following } },
            { new: true }
        )
        .then(async result => {
            // function(error, result) {
            //   if (result) {
            console.log("follower added", result);

            var new_followers = {
                userName: msg.userName,
                firstName: msg.firstName,
                lastName: msg.lastName,
                aboutMe: msg.aboutMe,
                profileImage: msg.profileImage
            }

            return await Musers
                .update(
                    { userName: msg.followUserName },
                    { $push: { followers: new_followers } }
                )
                .then(async result2 => {
                    console.log("following added", result2);
                    //res.end("followed successful", result2);
                    response.status = 200;
                    response.message = "followed successful";
                    response.data = "followed successful" + result2;
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    //return res.end("" + error);
                    err.status = 410;
                    err.message = "couldn't follow users" + error;
                    err.data = error;
                    return callback(err, null);
                });
        })
        .catch(error => {
            console.log(error);
            //return res.end("" + error);
            err.status = 411;
            err.message = "couldn't follow users" + error;
            err.data = error;
            return callback(err, null);
        });

};

exports.handle_request = handle_request;