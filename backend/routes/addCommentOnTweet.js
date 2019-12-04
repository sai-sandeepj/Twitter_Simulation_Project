const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweets = require("../model/tweets");

app.post("/addCommentOnTweet", async (req, res) => {
  console.log("In addCommentOnTweet POST");

  var new_comment = {
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    commentTime: Date.now(),
    comment: req.body.comment,
    commentMedia: req.body.commentMedia,
    profileImage :req.body.userImage
  };

  return await tweets
    .findByIdAndUpdate(
      req.body.tweetId,
      {
        $push: { comments: new_comment }
      },
      { new: true }
    )
    .then(result => {
      console.log("comment added", result);
      res.end("comment added");
    })
    .catch(err => {
      console.log("could not get tweets");
      return res.end("could not get tweets" + err);
    });
});

module.exports = app;