const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const tweet = require("../model/tweets");
//var mongousers = require("../model/mongousers");

app.post("/getUserLikedTweetIds", async (req, res) => {
    console.log("In getUserLikedTweetIds POST");

    return await Musers
        .findOne({ userName: req.body.userName })
        .select("liked")
        .then(async result => {
            var liked_array = [];
            console.log('result', result);


            result.liked.forEach(element => {
                liked_array.push(element.tweetId);
            });
            console.log('liked ids', liked_array);

            res.status(200).end(JSON.stringify(liked_array));

        })
        .catch(err => {
            console.log("could not get following", err);
            return res.status(411).end("could not get following");
        });
});

module.exports = app;