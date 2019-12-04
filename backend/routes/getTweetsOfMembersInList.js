const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweets = require("../model/tweets");
const lists = require("../model/lists");

app.post("/getTweetsOfMembersInList", async (req,res)=>{
    console.log("In getTweetsOfMembersInList post");
    
    return await lists
        .findOne({_id: req.body.listId})
        .select("members.userName")
        .then(async result=>{
            console.log(result);

            var members = [];
            for(var i=0; i<(result.members).length; i++){
                members.push(result.members[i].userName);
            }
            
            return await tweets
                .find({userName: { $in: members}})
                .select()
                .then(result1 =>{
                    console.log(result1);
                    res.end(JSON.stringify(result1));
                })
                .catch(err =>{
                    console.log(err);
                    res.end("could not get tweets");
                })

        })
        .catch(err =>{
            console.log(err);
            res.end("could not get tweets from lists");
        })

});

module.exports = app;