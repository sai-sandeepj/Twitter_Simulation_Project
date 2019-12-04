const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();
//
const lists = require("../model/lists");
var mongousers = require("../model/mongousers");
//
//
app.post("/subscribeToList", async (req, res) => {
  console.log("In subscribeToList POST");

  //var query_type = JSON.stringify(req.body.query);
  //var query_type = JSON.stringify(req.body.query);
  var query_type = req.body.query;
  console.log("query:", query_type);

  return await lists
    .findOne({
      _id: req.body.listId
    })
    .select(req.body.query)
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
            //res.status(200).end(JSON.stringify(result));

            var unsubscribed_list = {
              _id: req.body.listId
            };

            return await mongousers.findOneAndUpdate(
              { userName: req.body.userName },
              { $pull: { query_type: unsubscribed_list } }
            );
          })
          .catch(err => {
            console.log("");
            res.status(415).end("could not perfom unlike");
            //return res.end("could not get likes" + err);
          });
      } else {
        var new_subscriber = {
          userName: req.body.userName,
          firstName: req.body.firstName,
          lastName: req.body.lastName
          // //commentTime: Date.now(),
          // comment: req.body.comment,
          // commentMedia: req.body.commentMedia
        };

        return await lists
          .findByIdAndUpdate(
            req.body.listId,
            {
              $push: { query_type: new_subscriber }
            },

            { new: true }
          )
          .then(async result => {
            console.log("subscribed", result);
            res.end("subscribed", result);
            // res.status(200).end(JSON.stringify(result));

            var subscribed_list = {
              _id: req.body.listId
            };

            return await mongousers.findOneAndUpdate(
              { userName: req.body.userName },
              { $push: { query_type: subscribed_list } }
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
