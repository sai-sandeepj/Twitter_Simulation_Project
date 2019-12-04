var express = require('express');
var app = express();

const Musers = require('../model/Musers');

app.post("/getProfileViews", async(req,res)=>{
    console.log("In getProfileViews");
    
    return await Musers
        .findOne({userName: req.body.userName})
        .select()
        .then(result =>{
            console.log(result);
            res.end(JSON.stringify(result.views));
        })
        .catch(err =>{
            console.log(err);
            res.end("could not get musers");
        })

});

module.exports = app;