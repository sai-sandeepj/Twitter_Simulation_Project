const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const tweet = require("../model/tweets");

app.post("/getAllTweetsFollowing", async (req, res) => {
  console.log("In getAllTweetsFollowing POST");

  return await Musers
    .findOne({userName: req.body.userName})
    .select("following")
    .then(async result =>{
      var following_array = [];
      following_array.push(req.body.userName);

      result.following.forEach(element => {
        following_array.push(element.userName);
      });

      return await tweet
        .find({userName: { $in: following_array}})
        .select()
        .sort({tweetDate: -1})
        .then(async result2 =>{
          console.log(result2);
          res.end(JSON.stringify(result2));
        })
        .catch(err=>{
          console.log(err);
          res.end("could not get tweets");
        })
    })
    .catch(err => {
      console.log(err);
      res.end("Could not get user following tweets");
    })
});

module.exports = app;
