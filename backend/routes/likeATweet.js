const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

//const Musers = require("../model/Musers");
const tweets = require("../model/tweets");
var mongousers = require("../model/mongousers");

app.post("/likeATweet", async (req, res) => {
  console.log("In likes POST");

  return await tweets
    .findOne({
      _id: req.body.tweetId
    })
    .select("likes")
    .then(async result => {
      var likes_users = [];

      result.likes.forEach(element => {
        likes_users.push(element.userName);
      });

      var found = false;

      if (likes_users.includes(req.body.userName)) found = true;

      console.log(found);

      if (found) {
        var new_like = {
          userName: req.body.userName
          // firstName: req.body.firstName,
          // lastName: req.body.lastName,
          // //commentTime: Date.now(),
          // comment: req.body.comment,
          // commentMedia: req.body.commentMedia
        };

        return await tweets
          .findByIdAndUpdate(
            req.body.tweetId,
            {
              $pull: { likes: new_like }
            },
            { new: true }
          )
          .then(async result => {
            console.log("unliked", result);
            res.end("unliked", result);

            var unliked_tweet = {
              _id: req.body.tweetId
            };

            return await mongousers.findOneAndUpdate(
              { userName: req.body.userName },
              { $pull: { liked: unliked_tweet } }
            );
          })
          .catch(err => {
            console.log("");
            res.status(415).end("could not perfom unlike");
            //return res.end("could not get likes" + err);
          });
      } else {
        var new_like = {
          userName: req.body.userName
        };

        return await tweets
          .findByIdAndUpdate(
            req.body.tweetId,
            {
              $push: { likes: new_like }
            },

            { new: true }
          )
          .then(async result => {
            console.log("liked", result);
            res.end("liked", result);

            var liked_tweet = {
              _id: req.body.tweetId
            };

            return await mongousers.findOneAndUpdate(
              { userName: req.body.userName },
              { $push: { liked: liked_tweet } }
            );
          })
          .catch(err => {
            console.log("could not get likes");
            return res.status(416).end("could not perform like");
            //return res.end("could not get likes" + err);
          });
      }
    })
    .catch(err => {
      console.log("could not get tweets", err);
      return res.status(417).end("could not get tweets");
    });
});

module.exports = app;
