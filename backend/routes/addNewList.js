const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweet = require("../model/tweets");
var mongousers = require("../model/mongousers");
const lists = require("../model/lists");

app.post("/addNewList", async (req, res) => {
  console.log("In addNewList POST");

  var new_list = new lists({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    listName: req.body.listName,
    description: req.body.description
  });

  new_list.save(function(err) {
    if (err) {
      console.log("Unable to create list", err);
      res.status(411).end("Unable to create list");
    }
    console.log("List created successfully");
    res.status(200).end("List created successfully");
  });
});

module.exports = app;
