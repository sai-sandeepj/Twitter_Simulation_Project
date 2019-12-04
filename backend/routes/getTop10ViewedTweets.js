var express = require('express');
var app = express();

const tweets = require('../model/tweets');

app.post("/getTop10ViewedTweets", async(req,res)=>{
    console.log("In getTop10ViewedTweets post");

    tweets.aggregate([
        { "$project": {
            "_id": 1,
            "userName": 1,
            "tweetViews": 1,
            "length": { "$size": { "$ifNull":["$tweetViews", []]} }
            //"length": { "$size": "$tweetViews" }
        }},
        {"$sort": { "length": -1 }},
        { "$project": {
            "_id": 1,
            "userName": 1,
            "tweetViews": 1,
        }}
    ])
    .limit(10)
    .then(result =>{
        console.log(result);
        res.end(JSON.stringify(result));
    })
    .catch(err =>{
        console.log(err);
        res.end("could not get tweets");
    })

});

module.exports = app;