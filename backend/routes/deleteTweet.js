const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const tweets = require("../model/tweets");

app.post("/deleteTweet", async(req,res)=>{
    console.log("In deleteTweet");

    return await Musers
        .updateMany(
            //{'bookmarked.tweetId': req.body.tweetId},
            {},
            {$pull: {"bookmarked" : {tweetId: req.body.tweetId}}},
            {new: true}
        )
        .then(async result =>{
            console.log("tweet bookmarked deleted from musers");

            return await Musers
                .updateMany(
                    {},
                    {$pull: {"liked" : {tweetId: req.body.tweetId}}},
                    {new: true}
                )
                .then(async result1 =>{
                    console.log("tweet liked deleted from musers");
                    
                    return await Musers
                        .updateMany(
                            {},
                            {$pull: {"retweets" : {tweetId: req.body.tweetId}}},
                            {new: true}
                        )
                        .then(async result2 =>{
                            console.log("tweet retweets deleted from musers");
                            
                            return await tweets
                                .find({_id: req.body.tweetId})
                                .remove()
                                .then(result3 =>{
                                    console.log("tweet deleted");
                                    res.end("tweet deleted");
                                })
                                .catch(err =>{
                                    console.log(err);
                                    res.end("could not delete from tweets");
                                })
                        })
                        .catch(err =>{
                            console.log(err);
                            res.end("tweet retweets deleted from musers");
                        })
                })
                .catch(err =>{
                    console.log(err);
                    res.end("could not delete liked musers");
                })
        })
        .catch(err =>{
            console.log(err);
            res.end("could not delete tweet")
        })
});

module.exports = app;