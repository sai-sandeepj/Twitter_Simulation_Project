const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweet = require("../model/tweets");
const Musers = require("../model/Musers");
var mongousers = require("../model/mongousers");

//getUserTweets
app.post("/getUsers", async (req, res) => {
  console.log("In getUsers post");

  return await mongousers
    .findOne({ userName: req.body.userName })
    .select()
    .then(result => {
      console.log(result);
      res.status(200).end(JSON.stringify(result));
    })
    .catch(err => {
      console.log("could not get users");
      return res.status(411).end("could not get users");
    });
});

module.exports = app;
