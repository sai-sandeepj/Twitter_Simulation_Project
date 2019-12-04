const express = require("express");
const pool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const app = express.Router();

var Musers = require("../model/Musers");
const tweets = require("../model/tweets");
const lists = require("../model/lists");


app.post("/deActivateAccount", async(req,res)=>{
    console.log("In deActivateAccount post");

    const sql = "DELETE FROM users WHERE userName = "+
        mysql.escape(req.body.userName)+ ";"

        pool.getConnection((err, conn) => {
            if(err){
            console.log(err);
            res.end("error connecting to db");
            }else{
                conn.query(sql, async (err, result) => {
                    if(err){
                    console.log("could not get users");
                    res.end("error in getting users")
                    }else{
                        console.log("users table deleted");

                        return await Musers
                            .find({userName: req.body.userName})
                            .remove()
                            .then(async result1 =>{
                                console.log("musers table row deleted");
                                
                                return await tweets
                                    .find({userName: req.body.userName})
                                    .remove()
                                    .then(async result2 =>{
                                        console.log("tweets table row deleted");

                                        return await lists
                                            .find({userName: req.body.userName})
                                            .remove()
                                            .then(result3 =>{
                                                console.log("profile deactivated");
                                                res.end("profile deactivated");
                                            })
                                            .catch(err =>{
                                                console.log(err);
                                                res.end("could not delete lists row");
                                            })
                                        
                                    })
                                    .catch(err =>{
                                        console.log(err);
                                        res.end("could not delete tweets row");
                                    })

                            })
                            .catch(err =>{
                                console.log(err);
                                res.end("could not delete musers");
                            })

                    }
                })
            }
        })
    
});


module.exports = app;