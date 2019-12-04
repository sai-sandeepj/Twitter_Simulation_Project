const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const lists = require("../model/lists");

app.post("/subscribeToList", async (req, res) => {
  console.log("In subscribeToList POST");
  return await lists
    .findOne({ _id: req.body.listId })
    .select()
    .then(async result => {
      console.log(result.subscribers);
      alreadyListSubscriber = false;
      for (var i = 0; i < (result.subscribers).length; i++) {
        if (result.subscribers[i].userName == req.body.memberUserName) {
          alreadyListSubscriber = true;
          break;
        }
      }
      if (alreadyListSubscriber === true) {
        console.log("user already subscribed");
        //unsubscribe
        var old_subsriber = {
          userName: req.body.memberUserName,
          firstName: req.body.memberFirstName,
          lastName: req.body.memberLastName,
          profileImage: req.body.memberProfileImage
        }
        return await lists
          .update(
            { _id: req.body.listId },
            { $pull: { subscribers: old_subsriber } },
            { new: true }
          )
          .then(async result1 => {
            console.log("unsubsribed from lists");
            console.log("unsubsribe musers");
            var musers_subscriber = {
              listId: req.body.listId
            }
            return await Musers
              .update(
                { userName: req.body.memberUserName },
                { $pull: { subscribed: musers_subscriber } },
                { new: true })
              .then(result2 => {
                console.log("user unsubscribed");
                res.end("user unsubscribed");
              })
              .catch(err => {
                console.log(err);
                res.end("cannot remove from musers");
              })
          })
          .catch(err => {
            console.log(err);
            res.end("cannot unsubscribe");
          })




      } else {
        console.log("new subscriber");

        var new_subsriber = {
          userName: req.body.memberUserName,
          firstName: req.body.memberFirstName,
          lastName: req.body.memberLastName,
          profileImage: req.body.memberProfileImage
        }
        return await lists
          .update(
            { _id: req.body.listId },
            { $push: { subscribers: new_subsriber } },
            { new: true }
          )
          .then(async result1 => {
            console.log("added to list table");
            console.log("adding to musers");
            var musers_subscriber = {
              listId: req.body.listId
            }
            return await Musers
              .update(
                { userName: req.body.memberUserName },
                { $push: { subscribed: musers_subscriber } },
                { new: true })
              .then(result2 => {
                console.log("user subscribed");
                res.end("user subscribed");
              })
              .catch(err => {
                console.log(err);
                res.end("cannot add to musers");
              })
          })
          .catch(err => {
            console.log(err);
            res.end("cannot subscribe");
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.end("cannot get subscribers list");
    })
});

module.exports = app;
