const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweets = require("../model/tweets");

app.post("/retweetWithComment", async (req, res) => {
    console.log("In retweetWithComment POST");
    var d = new Date().toString();
    var l = d.split(' ').splice(0, 4).join(' ');
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();

    l = l + " " + hours + " " + minutes + " " + seconds;
    var new_retweet = new tweets({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profileImage: req.body.userImage,
        tweetMsg: req.body.tweetMsg,
        tweetDate: l,
        tweetMedia: req.body.tweetMedia,
        isRetweet: true
    });

    new_retweet.save(async (err, result) => {
        if (err) {
            console.log(err);
            res.end("could not retweet");
        } else {
            console.log("retweet success");

            var x = req.body.tweetMsg;
            var separators = [" ", "\\+", "-", "\\(", "\\)", "\\*", "/", ":", "\\?"];
            var tokens = x.split(new RegExp(separators.join("|"), "g"));
            console.log("tokens", tokens);

            var arr = [];
            for (var index = 0; index < tokens.length; index++) {
                if (tokens[index].indexOf("#") == 0) {
                    console.log("hash", tokens[index]);
                    arr.push(tokens[index]);
                }
            }

            var parent = {
                parentId: req.body.parentId,
                parentUserName: req.body.parentUserName,
                parentFirstName: req.body.parentFirstName,
                parentLastName: req.body.parentLastName,
                parentProfileImage: req.body.parentProfileImage,
                parentTweetMsg: req.body.parentTweetMsg,
                parentTweetMedia: req.body.parentTweetMedia
            }

            return await tweets
                .update(
                    { _id: result._id },
                    {
                        $push: {
                            parentTweetDetails: parent,
                            hashtags: { $each: arr }
                        }
                    },
                    { new: true }
                )
                .then(result2 => {
                    console.log("retweeted successfully");
                    res.end("retweeted successfully");
                })
                .catch(err => {
                    console.log(err);
                    res.end("could not save parent details");
                })
        }
    });
});

module.exports = app;