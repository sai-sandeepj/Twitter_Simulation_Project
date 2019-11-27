var express = require("express");
var app = express();
var mysqlPool = require("../configFiles/MysqlConnectionPooling");
var mysql = require("mysql");
const redis = require("redis");

const client = redis.createClient();

app.get("/getProfile", async (req, res) => {
  console.log("In getProfile GET");

  const RedisKey = req.body.userName;
  console.log("RedisKey", RedisKey);

  return client.get(RedisKey, (err, result) => {
    if (result) {
      console.log("Inside Redis");
      //const resultJSON = JSON.parse(result);
      console.log("Profile data from Redis: ", result);
      res.status(200).end(result);
      //res.status(200).end(result);
    } else {
      console.log("Not inside redis");
      mysqlPool.getConnection(async (err, conn) => {
        if (err) {
          console.log("Error while creating connection");
          res.writeHead(500, {
            "Content-type": "text/plain"
          });
          res.end("Error while creating connection");
        } else {
          const sql1 =
            "SELECT * FROM users WHERE userName= " +
            mysql.escape(req.body.userName);

          conn.query(sql1, (err, result1) => {
            if (err) {
              console.log("Error in retrieving profile data");
              res.writeHead(400, {
                "Content-type": "text/plain"
              });
              res.end("Error in retrieving profile data");
            } else {
              //client.setex(RedisKey, 3600, result1);
              client.setex(RedisKey, 3600, JSON.stringify(result1));
              //client.setex(UN, 3600, UE);
              console.log("Set key done");
              console.log("Profile data: ", result1);
              res.status(200).end(JSON.stringify(result1));
            }
          });
        }
      });
    }
  });
});

module.exports = app;
