const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");

app.post("/findUsers", async (req, res) => {
    console.log("In findUsers post");
    console.log(req.body.findName);
    console.log(req.body.findName);
    return await Musers
        .find({
            $or: [
                { firstName: { "$regex": new RegExp(req.body.findName) } },
                { lastName: { "$regex": new RegExp(req.body.findName) } },
                { userName: { "$regex": new RegExp(req.body.findName) } }
            ]
        })
        .select(['userName', 'firstName', 'lastName', 'profileImage', '-_id'])
        .then(result => {
            console.log(result);
            res.end(JSON.stringify(result));
        })
        .catch(err => {
            console.log("could not find users", err);
            return res.end("could not find users");
        })
});

module.exports = app;