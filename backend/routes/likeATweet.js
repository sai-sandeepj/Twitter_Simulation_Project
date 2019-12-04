const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const tweets = require("../model/tweets");
//var mongousers = require("../model/mongousers");

app.post('/likeATweet', async (req, res) => {
  console.log("In likeATweet POST");

  return await tweets
    .findOne({
      _id: req.body.tweetId
    })
    .select("likes")
    .then(async result => {
      //console.log("result", result);

      var likes_users = [];
      var found = false;
      result.likes.forEach(element => {
        likes_users.push(element.userName);
      });
      //console.log(likes_users);
      if (likes_users.includes(req.body.userName)) {
        found = true;
      }

      if (found === true) {
        var new_like = {
          userName: req.body.userName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          aboutMe: req.body.aboutMe,
          profileImage: req.body.profileImage
        }

        return await tweets
          .update(
            { _id: req.body.tweetId },
            {
              $pull: { likes: new_like }
            },
            { safe: true }
          )
          .then(async result1 => {
            console.log("unliked", result1);

            var unliked_tweet = {
              tweetId: req.body.tweetId
            }

            return await Musers
              .update(
                { userName: req.body.userName },
                { $pull: { liked: unliked_tweet } }
              )
              .then(result2 => {
                //console.log(result2);
                res.end("unliked");
              })
              .catch(err => {
                console.log(err);
                res.end("could not perform unlike" + err);
              })
          })
          .catch(err => {
            console.log(err);
            res.end("could not perform unlike" + err);
          })
      } else {
        console.log("need to like a tweet");

        var new_like = {
          userName: req.body.userName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          aboutMe: req.body.aboutMe,
          profileImage: req.body.profileImage
        }

        return await tweets
          .update(
            { _id: req.body.tweetId },
            {
              $push: { likes: new_like }
            },
            { new: true }
          )
          .then(async result3 => {
            console.log("liked", result3);

            var liked_tweet = {
              tweetId: req.body.tweetId
            }

            return await Musers
              .update(
                { userName: req.body.userName },
                { $push: { liked: liked_tweet } },
                { new: true }
              )
              .then(async result4 => {
                console.log(result4);
                res.end("Tweet liked successfully");
              })
              .catch(err => {
                console.log(err);
                res.end("cannot like tweet");
              })
          })
          .catch(err => {
            console.log(err);
            res.end("cannot like tweet");
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(411).end("cannot get likes");
    })

});


module.exports = app;