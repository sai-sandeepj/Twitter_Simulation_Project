const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const followers = require("../model/followersSchema");
const following = require("../model/followingSchema");
const UsersM = require("../model/UsersM");

app.post("/usersThatIamFollowing", async (req, res) => {
  console.log("In usersThatIamFollowing POST");

  return await UsersM.findOne({ userName: req.body.userName })
    .select("following")
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
