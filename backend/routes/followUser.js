const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");

app.post("/followUser", async (req, res) => {
  console.log("In followUser POST");

  var new_following = {
    userName: req.body.followUserName,
    firstName: req.body.followFirstName,
    lastName: req.body.followLastName,
    aboutMe: req.body.followAboutMe,
    profileImage: req.body.followProfileImage
  }

  return await Musers
    .update(
      { userName: req.body.userName },
      { $push: { following: new_following } },
      { new: true }
    )
    .then(async result => {
      // function(err, result) {
      //   if (result) {
      console.log("follower added", result);

      var new_followers = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        aboutMe: req.body.aboutMe,
        profileImage: req.body.profileImage
      }

      return await Musers
        .update(
          { userName: req.body.followUserName },
          { $push: { followers: new_followers } }
        )
        .then(async result2 => {
          console.log("following added", result2);
          res.end("followed successful", result2);
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
