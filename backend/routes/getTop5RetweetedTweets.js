const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweets = require("../model/tweets");

app.post("/getTop5RetweetedTweets", async(req,res)=>{
    console.log("In getTop5RetweetedTweets post");
    
    tweets.aggregate([
        { "$project": {
            "_id": 1,
            "userName": 1,
            "retweetNoComment": 1,
            "length": { "$size": "$retweetNoComment" }
        }},
        {"$sort": { "length": -1 }},
        { "$project": {
            "_id": 1,
            "userName": 1,
            "retweetNoComment": 1,
        }}
    ])
    .limit(5)
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