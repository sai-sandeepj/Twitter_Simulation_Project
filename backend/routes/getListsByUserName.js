const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const lists = require("../model/lists");

app.post("/getListsByUserName", async(req,res)=>{
    console.log("In getListsByUserName POST");
    
    return await lists
        .find({userName: req.body.userName})
        .select()
        .then(result =>{
            console.log("got lists");
            res.end(JSON.stringify(result));
        })
        .catch(err =>{
            console.log(err);
            res.end(JSON.stringify(err));
        })

});

module.exports = app;