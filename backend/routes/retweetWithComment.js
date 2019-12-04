const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweets = require("../model/tweets");
var mongousers = require("../model/mongousers");

app.post("/retweetWithComment", async (req, res) => {
  console.log("In retweetWithComment POST");

  return await tweets
    .findOne({
      _id: req.body.tweetId
    })
    .then(async result => {
      console.log("tweet", result);
      //res.status(200).send(JSON.stringify(result));

      var retweet = new tweets({
        isRetweet: req.body.isRetweet,
        parentId: result._id,
        userName: req.body.userName,
        tweetMsg: req.body.comment,
        tweetDate: Date.now(),
        tweetMedia: result.tweetMedia
      });

      retweet.save(function(err, result) {
        if (err) {
          console.log("Unable to retweet", err);
          res.status(417).send(err);
        }
        console.log("Retweet Success");
        res.end("Retweet Success", result);
        //res.status(200).send(JSON.stringify(result));
      });
    })

    .catch(err => {
      console.log("Could not find tweet");
      return res.status(416).end("Could not find tweet");
      //return res.end("could not get likes" + err);
    });
});

module.exports = app;
