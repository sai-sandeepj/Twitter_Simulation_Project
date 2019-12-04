const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const lists = require("../model/lists");

app.post("/getUserSubscribedLists", async(req,res)=>{
    console.log("In getUserSubscribedLists post");
    
    return await Musers
        .findOne({userName: req.body.userName})
        .select(["subscribed", "-_id"])
        .then(async result1 =>{
            console.log(result1.subscribed);
            
            var subscribed_lists = [];

            for(var i=0;i< (result1.subscribed).length; i++){
                subscribed_lists.push(result1.subscribed[i].listId);
            }
            console.log(subscribed_lists);
            
            return await lists
                .find({_id: { $in: subscribed_lists}})
                .select()
                .then(result2 =>{
                    console.log(result2);
                    res.end(JSON.stringify(result2));
                })
                .catch(err =>{
                    console.log(err);
                    res.end("could not get lists");
                })

        })
        .catch(err =>{
            console.log(err);
            res.end("cannot get user from musers");
        })

});

module.exports = app;