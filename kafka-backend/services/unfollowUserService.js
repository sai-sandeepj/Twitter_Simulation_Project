const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const { Musers } = require("../model/Musers");

async function handle_request(msg, callback) {

    console.log("Inside unfollow user in kafka backend");
    let response = {};
    let err = {};

    var new_unfollowing = {
        userName: msg.unfollowUserName,
        firstName: msg.unfollowFirstName,
        lastName: msg.unfollowLastName,
        aboutMe: msg.unfollowAboutMe,
        profileImage: msg.unfollowProfileImage
    }

    return await Musers
        .update(
            { userName: msg.userName },
            { $pull: { following: new_unfollowing } },
            { new: true }
        )
        .then(async result => {
            console.log("following removed");

            var new_unfollower = {
                userName: msg.userName,
                firstName: msg.firstName,
                lastName: msg.lastName,
                aboutMe: msg.aboutMe,
                profileImage: msg.profileImage
            }

            return await Musers
                .update(
                    { userName: msg.unfollowUserName },
                    { $pull: { followers: new_unfollower } }
                )
                .then(result2 => {
                    console.log("user unfollowing successful");
                    //res.end("user unfollowing successful");
                    response.status = 200;
                    response.message = "user unfollowing successful";
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    //res.end("could not unfollow user");
                    err.status = 410;
                    err.message = "could not unfollow user";
                    err.data = error;
                    return callback(err, null);
                })
        })
        .catch(error => {
            console.log(error);
            //res.end("could not unfollow user");
            err.status = 411;
            err.message = "could not unfollow user";
            err.data = error;
            return callback(err, null);
        })
};

exports.handle_request = handle_request;