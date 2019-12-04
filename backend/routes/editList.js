const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const lists = require("../model/lists");

app.post("/editList", async (req,res)=>{
    console.log("In editList POST");
    
    return await lists
        .update(
            {_id: req.body.listId},
            {$set: {
                listName: req.body.listName,
                description: req.body.description
            }},
            {new: true}
        )
        .then(result =>{
            console.log("list edited successfully");
            res.end("list edited successfully");
        })
        .catch(err=>{
            console.log(err);
            res.end("could not get list")
        })
});

module.exports = app;