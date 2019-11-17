const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const followers = require("../model/followersSchema");
const following = require("../model/followingSchema");
const UsersM = require("../model/UsersM");

app.post("/followUser", async (req, res) => {
  console.log("In followUser POST");

  // return await UsersM.findOne({ userName: req.body.userName })
  //   .select()
  //   .then(
  //     asyn(result => {
  //       if (!result) {
  //         console.log("userName not found");
  //         return res.status(415).end("userName not found");
  //       } else {
  //         console.log("logged in user detail", result);

  //         var new_following = new following({
  //           userName: req.body.userName
  //           firstName: req.body.followerFirstName,
  //           lastName: req.body.followerFirstName
  //         });
  //       }
  //     })
  //   );
  // var new_follower = new followers({
  //   //person who is logged in wants to follow the user
  //   userName: req.body.followUserName
  //   // firstName: req.body.followerFirstName,
  //   // lastName: req.body.followerFirstName
  // });

  // var new_follower = {
  //   userName: req.body.followUserName
  // };

  //console.log("new_follower", new_follower);

  return await UsersM.update(
    { userName: req.body.userName },
    { $push: { followers: { userName: req.body.followUserName } } }
  )
    .then(async result => {
      // function(err, result) {
      //   if (result) {
      console.log("follower added", result);
      res.end("follower added", result);

      return await UsersM.updateOne(
        { userName: req.body.followUserName },
        { $push: { following: { userName: req.body.userName } } }
      )
        .then(async result2 => {
          console.log("follower added", result2);
          res.end("follower added", result2);
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

  // var new_user = new UsersM({
  //   userName: req.body.userName
  // });

  // new_user.save(function(err) {
  //   if (err) {
  //     console.log("Unable to tweet", err);
  //     res.status(411).end("Unable to tweet");
  //   }
  //   console.log("Tweet success");
  //   res.status(200).end("user successful");
  // });

  // return await UsersM.findOne({ userName: req.body.userName })
  //   .select()
  //   .then(result => {
  //     console.log(result);
  //     res.status(200).end(JSON.stringify(result));
  //   })
  //   .catch(err => {
  //     console.log("could not get tweets");
  //     return res.status(411).end("could not get tweets");
  //   });
});

module.exports = app;
