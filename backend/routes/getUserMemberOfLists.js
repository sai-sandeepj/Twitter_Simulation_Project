const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const lists = require("../model/lists");

app.post("/getUserMemberOfLists", async(req,res)=>{
    console.log("In getUserMemberOfLists POST");
    
    return await Musers
        .findOne({userName: req.body.userName})
        .select(["memberOf", "-_id"])
        .then( async result1 =>{
            console.log(result1.memberOf);
            
            var memberOf_lists = [];
            for(var i=0;i< (result1.memberOf).length; i++){
                memberOf_lists.push(result1.memberOf[i].listId);
            }
            console.log(memberOf_lists);
            
            return await lists
                .find({_id: { $in: memberOf_lists}})
                .select()
                .then(result2 =>{
                    console.log(result2);
                    res.end(JSON.stringify(result2));
                })
                .catch(err=>{
                    console.log(err);
                    res.end("could not get lists");
                })

        })
        .catch(err =>{
            console.log(err);
            res.end("cannot get members from musers")
        })

});

module.exports = app;