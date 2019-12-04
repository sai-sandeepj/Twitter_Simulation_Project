const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweets = require("../model/tweets");

app.post("/getTop10LikedTweets", async(req,res)=>{
    console.log("In getTop10LikedTweets post");

    tweets.aggregate([
        { "$project": {
            "_id": 1,
            "userName": 1,
            "likes": 1,
            "length": { "$size": "$likes" }
        }},
        {"$sort": { "length": -1 }},
        { "$project": {
            "_id": 1,
            "userName": 1,
            "likes": 1,
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