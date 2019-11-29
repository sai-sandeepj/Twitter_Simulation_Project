var express = require("express");

var app = express();

const tweets = require("../model/tweets");

app.post("/searchByHashtag", async (req, res) => {
  console.log("In restaurantsbyItemCuisine");

  var topic = req.body.topic;

  return await tweets
    .find({
      hashtags: topic
    })
    .then(result => {
      console.log("result", result);
      return res.status(200).end("" + result);
    })
    .catch(err => {
      console.log("error in searching topics");
      return res.status(410).end("error in searching topics");
    });
});

module.exports = app;
