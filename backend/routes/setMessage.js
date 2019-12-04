const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const messages = require("../model/messages");

app.post("/setMessage", async (req, res) => {
    console.log("In setMessage post");

    return await messages.find({
        $and: [
            { $or: [{ "sender.senderUserName": req.body.senderUserName }, { "sender.senderUserName": req.body.receiverUserName }] },
            { $or: [{ "receiver.receiverUserName": req.body.senderUserName }, { "receiver.receiverUserName": req.body.receiverUserName }] }
        ]
    })
        .select()
        .then(async result => {
            console.log("got messages");
            console.log(result);

            if (result.length === 0) {
                console.log("create new document");

                var new_conversation = new messages({
                    "sender.senderUserName": req.body.senderUserName,
                    "sender.senderFirstName": req.body.senderFirstName,
                    "sender.senderLastName": req.body.senderLastName,
                    "sender.senderProfileImage": req.body.senderProfileImage,

                    "receiver.receiverUserName": req.body.receiverUserName,
                    "receiver.receiverFirstName": req.body.receiverFirstName,
                    "receiver.receiverLastName": req.body.receiverLastName,
                    "receiver.receiverProfileImage": req.body.receiverProfileImage
                })

                new_conversation.save(async (err, result1) => {
                    if (err) {
                        console.log(err);
                        res.end("could not create new conversation");
                    } else {
                        console.log("conversation created");

                        var new_conversation = {
                            sent_by: req.body.senderUserName,
                            message: req.body.message
                        }

                        return await messages
                            .update(
                                { _id: result1._id },
                                { $push: { messages: new_conversation } },
                                { new: true }
                            )
                            .then(result2 => {
                                console.log("message sent");
                                res.end("message sent");
                            })
                            .catch(err => {
                                console.log(err);
                                res.end("could not append to message");
                            })
                    }
                });
            } else {
                console.log("append to document");

                var new_message = {
                    sent_by: req.body.senderUserName,
                    message: req.body.message
                }

                return await messages
                    .update(
                        { _id: result[0]._id },
                        { $push: { messages: new_message } },
                        { new: true }
                    )
                    .then(result3 => {
                        console.log("message sent");
                        res.end("message sent");
                    })
                    .catch(err => {
                        console.log(err);
                        res.end("could not append to messages");
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
});

module.exports = app;