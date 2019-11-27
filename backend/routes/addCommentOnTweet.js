const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

//delete XUTYevutzod from mysql
//delete YWGMdmczaHU from mysql

const tweets = require("../model/tweets");
//const comments = require("../model/comments");

app.post("/addCommentOnTweet", async (req, res) => {
  console.log("In addCommentOnTweet POST");

  var new_comment = {
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    //commentTime: Date.now(),
    comment: req.body.comment,
    commentMedia: req.body.commentMedia
  };

  return await tweets
    .findByIdAndUpdate(
      req.body.tweetId,
      {
        $push: { comments: new_comment }
        //userName: req.body.userName
        // firstName: req.body.firstName,
        // lastName: req.body.lastName,
        // commentMedia: [],
        // comment: req.body.comment
      },
      //}
      // },
      { new: true }
    )
    .then(result => {
      console.log("comment added", result);
      res.end("comment added", result);
    })
    .catch(err => {
      console.log("could not get tweets");
      return res.end("could not get tweets" + err);
    });
});

module.exports = app;
