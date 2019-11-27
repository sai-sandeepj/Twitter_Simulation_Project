const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const lists = require("../model/lists");

app.post("/subscribeToList", async (req, res) => {
  console.log("In subscribeToList POST");

  return await lists
    .findOne({
      _id: req.body.listId
    })
    .select("subscribers")
    .then(async result => {
      var subscribers_array = [];

      result.subscribers.forEach(element => {
        subscribers_array.push(element.userName);
      });

      var found = false;
      if (subscribers_array.includes(req.body.userName)) found = true;

      if (found) {
        var new_subscriber = {
          userName: req.body.userName
          // firstName: req.body.firstName,
          // lastName: req.body.lastName,
          // //commentTime: Date.now(),
          // comment: req.body.comment,
          // commentMedia: req.body.commentMedia
        };

        return await lists
          .findByIdAndUpdate(
            req.body.listId,
            {
              $pull: { subscribers: new_subscriber }
            },
            { new: true }
          )
          .then(async result => {
            console.log("unsubscribed", result);
            res.end("unsubscribed", result);
          })
          .catch(err => {
            console.log("");
            res.status(415).end("could not perfom unlike");
            //return res.end("could not get likes" + err);
          });
      } else {
        var new_subscriber = {
          userName: req.body.userName
          // firstName: req.body.firstName,
          // lastName: req.body.lastName,
          // //commentTime: Date.now(),
          // comment: req.body.comment,
          // commentMedia: req.body.commentMedia
        };

        return await lists
          .findByIdAndUpdate(
            req.body.listId,
            {
              $push: { subscribers: new_subscriber }
            },

            { new: true }
          )
          .then(async result => {
            console.log("subscribed", result);
            res.end("subscribed", result);
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
