const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const tweet = require("../model/tweets");
var mongousers = require("../model/mongousers");

app.post("/getUserBookmarkedTweets", async (req, res) => {
  console.log("In getUserBookmarkedTweets POST");

  return await mongousers
    .findOne({ userName: req.body.userName })
    .select("bookmarked")
    .then(async result => {
      var bookmarked_array = [];
      console.log(result);

      result.bookmarked.forEach(element => {
        bookmarked_array.push(element._id);
      });

      return await tweet
        .find({ _id: { $in: bookmarked_array } })
        .select()
        .sort({ tweetDate: -1 })
        .then(async result2 => {
          console.log(result2);
          res.status(200).end(JSON.stringify(result2));
        })
        .catch(err => {
          console.log("could not get tweets", err);
          return res.status(411).end("could not get tweets");
        });
    })
    .catch(err => {
      console.log("could not get following", err);
      return res.status(411).end("could not get following");
    });
});

module.exports = app;
