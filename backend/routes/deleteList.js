const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const lists = require("../model/lists");

app.post("/deleteList", async(req,res)=>{
    console.log("In deletelist POST");
    
    return await lists
        .remove({_id: req.body.listId})
        .then(result=>{
            console.log("deleted list");
            res.end("list deleted");
        })
        .catch(err=>{
            console.log("error in deleting list",err);
            res.end("error in deleting list");
        })
});

module.exports = app;