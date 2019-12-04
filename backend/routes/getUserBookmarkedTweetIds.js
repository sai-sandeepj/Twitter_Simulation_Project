const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const tweet = require("../model/tweets");

app.post("/getUserBookmarkedTweetIds", async (req, res) => {
    console.log("In getUserBookmarkedTweets POST");

    return await Musers
        .findOne({ userName: req.body.userName })
        .select("bookmarked")
        .then(async result => {
            var bookmarked_array = [];
            // console.log(result);
            result.bookmarked.forEach(element => {
                bookmarked_array.push(element.tweetId);
            });
              console.log('bookmarked array',bookmarked_array);
            res.status(200).end(JSON.stringify(bookmarked_array));
        })
        .catch(err => {
            console.log("could not get following", err);
            return res.status(411).end("could not get following");
        });
});

module.exports = app;
