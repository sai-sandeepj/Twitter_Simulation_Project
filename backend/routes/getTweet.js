const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const tweets = require("../model/tweets");

app.post("/getTweet", async (req,res)=>{
    console.log("In getTweet post");
    
    return await tweets
        .findOne({_id: req.body.tweetId})
        .select()
        .then(async result =>{
            console.log(result);
            //res.end(JSON.stringify(result));

            var d = new Date().toString();
            var l = d.split(' ').splice(0, 4).join(' ');

            var same_day = false;

            for(var i=0; i< (result.tweetViews).length; i++){
                if((result.tweetViews[i].viewDate) === l){
                    same_day = true;
                    console.log(same_day);
                    array_day = i;
                    array_day_counter = result.tweetViews[i].viewCounter;
                    console.log("----"+array_day);
                    console.log("****"+array_day_counter);
                    break;
                }
            }

            if(same_day === true){
                console.log("increase counter");
                //res.end("increase counter");

                return await tweets
                    .update(
                        {_id: req.body.tweetId, 'tweetViews.viewDate': l},
                        {$set: {"tweetViews.$.viewCounter": (array_day_counter+1)}},
                        {new: true}
                    )
                    .then(result1 =>{
                        console.log(result1);
                        res.end(JSON.stringify(result));
                    })
                    .catch(err =>{
                        console.log(err);
                        res.end("could not increase counter");
                    })

            }else{
                console.log("create new date");
                //res.end("create new date");

                var new_date = {
                    viewDate: l,
                    viewCounter: 1,
                    viewTimeStamp: Date.now()
                }

                return await tweets
                    .update(
                        {_id: req.body.tweetId},
                        { $push: {tweetViews: new_date}},
                        {new: true}
                    )
                    .then(result10 =>{
                        console.log("new date created");
                        res.end(JSON.stringify(result));
                    })
                    .catch(err =>{
                        console.log(err);
                        res.end("could not create new field");
                    })

            }

        })
        .catch(err=>{
            console.log(err);
            res.end("could not get tweet");
        })
});

module.exports = app;