const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweets = require("../model/tweets");

app.post("/searchByHashTag", async(req,res)=>{
    console.log("In searchByHashTag post");

    return await tweets
        //.find({hashtags: req.body.hashTag})
        .find({hashtags: { "$regex": req.body.hashTag, "$options": "i" }})
        .select()
        .then(result =>{
            console.log("got hashtag tweets");
            res.end(JSON.stringify(result));
        })
        .catch(err =>{
            console.log(err);
            res.end("could nt get hastag tweets");
        })
    
});

module.exports = app;