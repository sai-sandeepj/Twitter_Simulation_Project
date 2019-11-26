const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

//const Musers = require("../model/Musers");
const tweets = require("../model/tweets");

app.post("/likes", async (req, res) => {
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
            console.log("unliked", result);
            res.end("unliked", result);
          })
          .catch(err => {
            console.log("could not get likes");
            return res.end("could not get likes" + err);
          });
      } else {
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
              $push: { likes: new_like }
              //userName: req.body.userName
              // firstName: req.body.firstName,
              // lastName: req.body.lastName,
              // commentMedia: [],
              // comment: req.body.comment
            },

            { new: true }
          )
          .then(result => {
            console.log("liked", result);
            res.end("liked", result);
          })
          .catch(err => {
            console.log("could not get likes");
            return res.end("could not get likes" + err);
          });
      }

      res.status(200).end(JSON.stringify(result));
    })
    .catch(err => {
      console.log("could not get following", err);
      return res.status(411).end("could not get following");
    });
});

module.exports = app;
