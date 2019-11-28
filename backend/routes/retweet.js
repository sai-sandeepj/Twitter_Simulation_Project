const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweets = require("../model/tweets");
var mongousers = require("../model/mongousers");

app.post("/retweet", async (req, res) => {
  console.log("In retweet POST");

  var new_retweet = {
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  };

  return await tweets
    .findByIdAndUpdate(
      req.body.tweetId,
      {
        $push: { retweetNoComment: new_retweet }
      },

      { new: true }
    )
    .then(async result => {
      console.log("retweetNoComment", result);
      res.end("retweetNoComment", result);

      var liked_tweet = {
        _id: req.body.tweetId
      };

      return await mongousers.findOneAndUpdate(
        { userName: req.body.userName },
        { $push: { retweets: liked_tweet } }
      );
    })
    .catch(err => {
      console.log("could not get likes");
      return res.status(416).end("could not perform like");
      //return res.end("could not get likes" + err);
    });
});

module.exports = app;
