const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const tweets = require("../model/tweets");

app.post("/deleteRetweet", async(req,res)=>{
    console.log("In deleteRetweet");
    
    return await tweets
        .update(
            {_id: req.body.tweetId},
            {$pull: {"retweetNoComment": {userName: req.body.userName}}},
            {new: true}
        )
        .then(async result =>{
            console.log("retweet deleted");

            return await Musers
                .update(
                    {userName: req.body.userName},
                    {$pull: {"retweets": { tweetId: req.body.tweetId}}},
                    {new: true}
                    )
                .then(result1 =>{
                    console.log("retweet deleted");
                    res.end("retweet deleted");
                })
                .catch(err =>{
                    console.log(err);
                    res.end("could not delete musers retweets");
                })

            //res.end("retweet deleted");
        })
        .catch(err =>{
            console.log(err);
            res.end("could not delete retweet");
        })

});

module.exports = app;