const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const tweet = require("../model/tweets");

app.post("/getUserRetweetIds", async (req, res) => {

    console.log("In getUserRetweets post");

    return await Musers
        .findOne({ userName: req.body.userName })
        .select("retweets")
        .then(async result => {
            var retweet_array = [];
            result.retweets.forEach(element => {
                retweet_array.push(element.tweetId);
            });
            console.log("retweeted array", retweet_array);
            res.status(200).end(JSON.stringify(retweet_array));
        })
        .catch(err => {
            console.log(err);
            res.end("could not get retweets");
        })


});

module.exports = app;
