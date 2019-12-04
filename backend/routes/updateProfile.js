const express = require("express");
const pool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");

const app = express.Router();

var Musers = require("../model/Musers");
const tweets = require("../model/tweets");
const lists = require("../model/lists");
const messages = require("../model/messages");

app.post("/updateProfile", async (req, res) => {
    console.log("In updateProfile post");

    const sql = "UPDATE users SET firstName = " +
        mysql.escape(req.body.firstName) + ", lastName = " +
        mysql.escape(req.body.lastName) + ", gender = " +
        mysql.escape(req.body.gender) + ", aboutMe = " +
        mysql.escape(req.body.aboutMe) + ", userImage = " +
        mysql.escape(req.body.userImage) + ", city = " +
        mysql.escape(req.body.city) + ", state = " +
        mysql.escape(req.body.state) + ", zipCode = " +
        mysql.escape(req.body.zipCode) + ", userPhone = " +
        mysql.escape(req.body.userPhone) + ", userName = " +
        mysql.escape(req.body.newUserName) + " WHERE userName = " +
        mysql.escape(req.body.userName) + ";"

    console.log(sql);



    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            res.end("error connecting to db");
        } else {
            conn.query(sql, async (err, result) => {
                if (err) {
                    console.log("could not get users");
                    res.end("error in getting users")
                } else {
                    console.log("users table updated");

                    res.end("profile data updated");

                    return await Musers
                        .update(
                            { userName: req.body.userName },
                            {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                profileImage: req.body.userImage
                            },
                            { new: true }
                        )
                        .then(async result1 => {
                            console.log("musers basic details changed");

                            return await tweets
                                .update(
                                    { userName: req.body.userName },
                                    {
                                        firstName: req.body.firstName,
                                        lastName: req.body.lastName,
                                        profileImage: req.body.userImage
                                    },
                                    { new: true }
                                )
                                .then(async result2 => {
                                    console.log("tweets details updated");

                                    return await lists
                                        .update(
                                            { userName: req.body.userName },
                                            {
                                                firstName: req.body.firstName,
                                                lastName: req.body.lastName
                                            },
                                            { new: true }
                                        )
                                        .then(result3 => {
                                            console.log("profile updated");
                                            res.end("profile updated");
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.end("could not update lists");
                                        })

                                })
                                .catch(err => {
                                    console.log(err);
                                    res.end("could not update tweets");
                                })



                        })
                        .catch(err => {
                            console.log(err);
                            res.end("could not update musers");
                        })




                }
            })
        }
    })

});



module.exports = app;