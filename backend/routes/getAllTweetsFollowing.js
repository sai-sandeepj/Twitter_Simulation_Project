const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

// const followers = require("../model/followersSchema");
// const following = require("../model/followingSchema");
const Musers = require("../model/Musers");
const tweet = require("../model/tweets");

app.post("/getAllTweetsFollowing", async (req, res) => {
  console.log("In getAllTweetsFollowing POST");

  return await Musers.findOne({ userName: req.body.userName })
    .select("following")
    .then(async result => {
      var following_array = [];

      result.following.forEach(element => {
        following_array.push(element.userName);
      });

      return await tweet
        .find({ userName: { $in: following_array } })
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
    //res.status(200).end(JSON.stringify(following_array));
    //})

    //
    .catch(err => {
      console.log("could not get following", err);
      return res.status(411).end("could not get following");
    });
});

module.exports = app;
