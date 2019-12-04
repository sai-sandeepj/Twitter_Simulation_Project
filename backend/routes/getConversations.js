const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const messages = require("../model/messages");

app.post("/getConversations", async (req, res) => {
    console.log("In getConversations post");

    return await messages.find({
        $or: [{ "sender.senderUserName": req.body.userName }, { "receiver.receiverUserName": req.body.userName }]

    })
        .select()
        .then(result => {
            console.log("got conversations");
            res.end(JSON.stringify(result));
        })
        .catch(err => {
            console.log(err);
            res.end("could not get messages");
        })

});

module.exports = app;