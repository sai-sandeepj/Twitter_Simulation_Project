const express = require("express");
const mongoPool = require("../configFiles/MongoConnectionPooling");
const app = express.Router();

const Musers = require("../model/Musers");
const tweets = require("../model/tweets");

app.post("/bookmarkATweet", async (req, res) => {
  console.log("In bookmarkATweet POST");

  return await Musers
    .find({userName: req.body.userName})
    .select("bookmarked")
    .then(async result =>{
      console.log((result[0].bookmarked).length);
      if((result[0].bookmarked).length === 0){
        var new_bookmark = {
          tweetId: req.body.tweetId
        }

        return await Musers
          .update(
            {userName: req.body.userName},
            { $push: {bookmarked: new_bookmark}},
            {safe: true}
          )
          .then(result1 =>{
            console.log("bookmark successful");
            res.end("bookmark successful");
          })
          .catch(err =>{
            console.log(err);
            res.end("could not bookmark tweet");
          })
      }else{
        console.log("user have bookmarks");
        
        var bookmarks_users = [];
        var found = false;
        result[0].bookmarked.forEach(element => {
          bookmarks_users.push(element.tweetId);
        });

        for(var i=0; i<bookmarks_users.length;i++){
          if(bookmarks_users[i] == req.body.tweetId){
            found = true;
            break;
          }
        }        

        if(found === true){
            var new_bookmark = {
            tweetId: req.body.tweetId
          }

          return await Musers
            .update(
              {userName: req.body.userName},
              { $pull: {bookmarked: new_bookmark}},
              {safe: true}
            )
            .then(result1 =>{
              console.log("unbookmark successsful");
              res.end("unbookmark successsful");
            })
            .catch(err =>{
              console.log(err);
              res.end("could not unbookmark tweet");
            })
        }else{

          var new_bookmark = {
            tweetId: req.body.tweetId
          }

          return await Musers
            .update(
              {userName: req.body.userName},
              { $push: {bookmarked: new_bookmark}},
              {safe: true}
            )
            .then(result2 =>{
              console.log("bookmark successsful");
              res.end("bookmark successsful");
            })
            .catch(err =>{
              console.log(err);
              res.end("could not unbookmark tweet");
          })
        }
      }
    })
    .catch(err=>{
      console.log(err);
      res.end("could not get bookmarks");
    })
});

module.exports = app;