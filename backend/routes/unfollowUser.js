const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const followers = require("../model/followersSchema");
const following = require("../model/followingSchema");
const UsersM = require("../model/UsersM");

app.post("/unfollowUser", async (req, res) => {
  console.log("In followUser POST");

  return await UsersM.update(
    { userName: req.body.userName },
    { $pull: { followers: { userName: req.body.followUserName } } }
  )
    .then(async result => {
      console.log("removed follower", result);
      res.end("removed follower", result);

      return await UsersM.updateOne(
        { userName: req.body.followUserName },
        { $pull: { following: { userName: req.body.userName } } }
      )
        .then(async result2 => {
          console.log("removed following", result2);
          res.end("removed following", result2);
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
