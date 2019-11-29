const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
const tweet = require("../model/tweets");

app.post("/mostLikes", async (req, res) => {
  console.log("In mostLikes POST");

  return tweet
    .aggregate([
      {
        $project: {
          userName: 1,
          tweetMsg: 1,
          tweetDate: 1,
          tweetMedia: 1,
          isRetweet: 1,
          parentId: 1,
          likes: 1,
          comments: 1,
          hashtags: 1,
          retweetNoComment: 1,
          length: { $size: "$likes" }
        }
      },
      { $sort: { length: -1 } },
      { $limit: 10 }
    ])
    .then(result => {
      console.log(result);
      res.status(200).end(JSON.stringify(result));
    })
    .catch(err => {
      console.log("could not get top 10 tweets", err);
      return res.status(411).end("could not get top 10 tweets");
    });
});

module.exports = app;
