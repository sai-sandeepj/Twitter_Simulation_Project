const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweet = require("../model/tweet");

app.post("/tweets", async (req, res) => {
  console.log("In tweet POST");

  var new_tweet = new tweet({
    userName: req.body.userName,
    tweetMsg: req.body.tweetMsg,
    tweetDate: Date.now(),
    tweetMedia: req.body.tweetMedia,
    isRetweet: req.body.isRetweet,
    parentId: req.body.parentId,
    // likes: {
    //   userName: {}
    // },
    comments: []
    // retweetNoComment: {
    //   userName: {}
    // }
  });

  new_tweet.save(function(err) {
    if (err) {
      console.log("Unable to tweet", err);
      res.status(411).end("Unable to tweet");
    }
    console.log("Tweet success");
    res.status(200).end("Tweeted successfully");
  });
});

module.exports = app;
