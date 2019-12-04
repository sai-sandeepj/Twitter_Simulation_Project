const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const lists = require("../model/lists");

app.post("/addMembersToList", async (req, res) => {
    console.log("In addMembersToList POST");

    return await lists
        .findOne({ _id: req.body.listId })
        .select()
        .then(async result => {
            console.log(result);

            if (((result.members).length) != 0) {

                alreadyListMember = false;
                for (var i = 0; i < (result.members).length; i++) {
                    if (await result.members[i].userName === req.body.memberUserName) {
                        alreadyListMember = true;
                        break;
                    }
                }
                if (alreadyListMember === true) {
                    console.log("User is already in list");
                    res.end("User is already added to list");
                } else {
                    var new_member = {
                        userName: req.body.memberUserName,
                        firstName: req.body.memberFirstName,
                        lastName: req.body.memberLastName,
                        profileImage: req.body.memberProfileImage
                    }
                    return await lists
                        .findByIdAndUpdate(
                            req.body.listId,
                            {
                                $push: { members: new_member }
                            },
                            { new: true }
                        )
                        .then(async result => {
                            console.log("member added to lists table");

                            var users_new_member = {
                                listId: req.body.listId
                            }

                            return await Musers
                                .update(
                                    { userName: req.body.memberUserName },
                                    {
                                        $push: { memberOf: users_new_member }
                                    },
                                    { new: true }
                                )
                                .then(result1 => {
                                    console.log("User added to list");
                                    res.end("user added to list");
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.end(JSON.stringify(err));
                                })
                        })
                        .catch(err => {
                            console.log(err);
                            res.end(JSON.stringify(err));
                        })










                }

            } else {
                var new_member = {
                    userName: req.body.memberUserName,
                    firstName: req.body.memberFirstName,
                    lastName: req.body.memberLastName,
                    profileImage: req.body.memberProfileImage
                }

                return await lists
                    .findByIdAndUpdate(
                        req.body.listId,
                        {
                            $push: { members: new_member }
                        },
                        { new: true }
                    )
                    .then(async result => {
                        console.log("member added to lists table");

                        var users_new_member = {
                            listId: req.body.listId
                        }

                        return await Musers
                            .update(
                                { userName: req.body.memberUserName },
                                {
                                    $push: { memberOf: users_new_member }
                                },
                                { new: true }
                            )
                            .then(result1 => {
                                console.log("User added to list");
                                res.end("user added to list");
                            })
                            .catch(err => {
                                console.log(err);
                                res.end(JSON.stringify(err));
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.end(JSON.stringify(err));
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.end(JSON.stringify(err));
        })
});

module.exports = app;