const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

// const followers = require("../model/followersSchema");
// const following = require("../model/followingSchema");
const Musers = require("../model/Musers");
var mongousers = require("../model/mongousers");
const tweets = require("../model/tweets");

app.post("/bookmarkATweet", async (req, res) => {
  console.log("In bookmarkATweet POST");

  return await tweets
    .findById(
      req.body.tweetId
      // { $push: { bookmarked: { tweetId: req.body.tweetId } } }
    )
    .then(async result => {
      console.log("tweet details", result);
      res.status(200).end(JSON.stringify(result));

      var bookmarked_tweet = {
        _id: result._id
        // userName: result.userName,
        // firstName: result.firstName
      };
      return await mongousers
        .findOneAndUpdate(
          { userName: req.body.userName },
          { $push: { bookmarked: bookmarked_tweet } }
        )
        .then(async result2 => {
          console.log("following added", result2);
          res.end("following added", result2);
        })
        .catch(err => {
          console.log(err);
          return res.end("" + err);
        });
    })
    .catch(err => {
      console.log(err);
      return res.end("" + err);
    });
});

module.exports = app;
