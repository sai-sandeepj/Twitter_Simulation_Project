const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");

app.post("/unfollowUser", async (req, res) => {
  console.log("In unfollowUser POST");

  var new_unfollowing = {
    userName: req.body.unfollowUserName,
    firstName: req.body.unfollowFirstName,
    lastName: req.body.unfollowLastName,
    // aboutMe: req.body.unfollowAboutMe,
    profileImage: req.body.unfollowProfileImage
  }

  return await Musers
    .update(
      { userName: req.body.userName },
      { $pull: { following: new_unfollowing } },
      { new: true }
    )
    .then(async result => {
      console.log("following removed");

      var new_unfollower = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        aboutMe: req.body.aboutMe,
        profileImage: req.body.profileImage
      }

      return await Musers
        .update(
          { userName: req.body.unfollowUserName },
          { $pull: { followers: new_unfollower } }
        )
        .then(result2 => {
          console.log("user unfollowing successful");
          res.end("user unfollowing successful");
        })
        .catch(err => {
          console.log(err);
          res.end("could not unfollow user");
        })
    })
    .catch(err => {
      console.log(err);
      res.end("could not unfollow user");
    })

  // return await Musers.update(
  //   { userName: req.body.userName },
  //   { $pull: { followers: { userName: req.body.followUserName } } }
  // )
  //   .then(async result => {
  //     console.log("removed follower", result);
  //     res.end("removed follower", result);



  //     return await Musers.updateOne(
  //       { userName: req.body.followUserName },
  //       { $pull: { following: { userName: req.body.userName } } }
  //     )
  //       .then(async result2 => {
  //         console.log("removed following", result2);
  //         res.end("removed following", result2);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         return res.end("" + err);
  //       });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     return res.end("" + err);
  //   });
});

module.exports = app;
