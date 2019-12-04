const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const lists = require("../model/lists");

app.post("/deleteMemberFromList", async (req, res) => {
    console.log("In deleteMemberFromList POST");

    var delete_member = {
        userName: req.body.memberUserName,
        firstName: req.body.memberFirstName,
        lastName: req.body.memberLastName,
        profileImage: req.body.memberProfileImage
    }

    return await lists
        .update(
            { _id: req.body.listId },
            { $pull: { members: delete_member } },
            { new: true })
        .then(async result1 => {
            console.log("deleted from lists");

            var muser_member = {
                listId: req.body.listId
            }

            return await Musers
                .update(
                    { userName: req.body.memberUserName },
                    { $pull: { memberOf: muser_member } },
                    { new: true })
                .then(result2 => {
                    console.log("User deleted from list");
                    res.end("User deleted from list");
                })
                .catch(err => {
                    console.log(err);
                    res.end("could not delete member from list");
                })
        })
        .catch(err => {
            console.log(err);
            res.end("could not delete members fro list");
        })
});

module.exports = app;