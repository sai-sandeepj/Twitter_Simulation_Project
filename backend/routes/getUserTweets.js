const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweet = require("../model/tweet");

//getUserTweets
app.post("/getUserTweets", async (req, res) => {
  console.log("In getUserTweets post");

  return await tweet
    .findOne({ userName: req.body.userName })
    .select()
    .then(result => {
      console.log(result);
      res.status(200).end(JSON.stringify(result));
    })
    .catch(err => {
      console.log("could not get tweets");
      return res.status(411).end("could not get tweets");
    });
});

module.exports = app;
