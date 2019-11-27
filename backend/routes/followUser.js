const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

// const followers = require("../model/followersSchema");
// const following = require("../model/followingSchema");
const Musers = require("../model/Musers");
var mongousers = require("../model/mongousers");

app.post("/followUser", async (req, res) => {
  console.log("In followUser POST");

  return await mongousers
    .findOneAndUpdate(
      { userName: req.body.userName },
      { $push: { following: { userName: req.body.followUserName } } }
    )
    .then(async result => {
      // function(err, result) {
      //   if (result) {
      console.log("follower added", result);
      res.end("follower added", result);

      return await mongousers
        .findOneAndUpdate(
          { userName: req.body.followUserName },
          { $push: { followers: { userName: req.body.userName } } }
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
