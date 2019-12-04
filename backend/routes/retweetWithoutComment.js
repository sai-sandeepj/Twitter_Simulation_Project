const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const tweets = require("../model/tweets");

app.post("/retweetWithoutComment", async(req,res)=>{
    console.log("In retweetWithoutComment POST");
    
    var new_retweet = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        aboutMe: req.body.aboutMe,
        profileImage: req.body.userImage
    }

    return await tweets
        .update(
            {_id: req.body.tweetId},
            { $push: { retweetNoComment: new_retweet}},
            {new: true})
        .then(async result =>{
            console.log("retweeted in tweets");
            
            var musers_retweet = {
                tweetId: req.body.tweetId,
                retweetTime: Date.now()
            };

            return await Musers
                .update(
                    {userName: req.body.userName},
                    { $push :{retweets: musers_retweet}},
                    {new: true}
                )
                .then(result1 =>{
                    console.log("retweeted successfully");
                    res.end("retweeted successfully");
                })
                .catch(err =>{
                    console.log(err);
                    res.end("could not add to musers");
                })
        })
        .catch(err =>{
            console.log(err);
            res.end("could not retweet");
        })
});

module.exports = app;