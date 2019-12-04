var express = require('express');
var app = express();
var mysqlPool = require('../configFiles/MysqlConnectionPooling');
var mysql = require('mysql');
const Musers = require('../model/Musers');

app.post('/getProfile', async (req, res) => {
    console.log("In getProfile GET", req.body);

    var final_result = [];
    var array_day;
    var array_day_counter;

    mysqlPool.getConnection(async (err, conn) => {
        if (err) {
            console.log("Error while creating connection");
            res.writeHead(500, {
                "Content-type": "text/plain"
            });
            res.end("Error while creating connection");
        } else {

            const sql1 = 'SELECT * FROM users WHERE userName= ' +
                mysql.escape(req.body.userName);

            conn.query(sql1, async (err, result1) => {
                if (err) {
                    console.log("Error in retrieving profile data");
                    res.writeHead(400, {
                        "Content-type": "text/plain"
                    });
                    res.end("Error in retrieving profile data");
                } else {
                    console.log("Profile data: ", result1);
                    final_result.push(result1);

                    return await Musers
                        .findOne({ userName: req.body.userName })
                        .select()
                        .then(async result2 => {
                            console.log("got profile");
                            final_result.push(result2);

                            var d = new Date().toString();
                            var l = d.split(' ').splice(0, 4).join(' ');

                            var same_day = false;

                            for (var i = 0; i < (result2.views).length; i++) {

                                if ((result2.views[i].viewDate) === l) {
                                    same_day = true;
                                    console.log(same_day);
                                    array_day = i;
                                    array_day_counter = result2.views[i].viewCounter;
                                    console.log("----" + array_day);
                                    console.log("****" + array_day_counter);
                                    break;
                                }
                            }

                            if (same_day === true) {
                                console.log("increase counter");
                                //res.end("increase counter");

                                console.log("------------" + array_day);
                                console.log("------------" + array_day_counter);

                                return await Musers
                                    .update(
                                        { userName: req.body.userName, 'views.viewDate': l },
                                        { $set: { "views.$.viewCounter": (array_day_counter + 1) } },
                                        { new: true }
                                    )
                                    .then(result3 => {
                                        console.log(final_result);
                                        res.end(JSON.stringify(final_result));
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.end("could not update musers");
                                    })
                            } else {
                                console.log("create new date");

                                var new_date = {
                                    viewDate: l,
                                    viewCounter: 1
                                }

                                return await Musers
                                    .update(
                                        { userName: req.body.userName },
                                        { $push: { views: new_date } },
                                        { new: true }
                                    )
                                    .then(result10 => {
                                        console.log("new date created");
                                        res.end(JSON.stringify(final_result));
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.end("could not create musers");
                                    })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            res.end("could not get musers");
                        })
                }
            });
        }
    });
});

module.exports = app;