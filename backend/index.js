var express = require("express");
var bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var mongoose = require("mongoose");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const signUp = require("./routes/signUp");
const getUserTweets = require("./routes/getUserTweets");
const tweets = require("./routes/tweets");

//ownerSignup
app.use("/", signUp);
app.use("/", getUserTweets);
app.use("/", tweets);

app.listen(3001, () => {
  console.log("server is running on port 3001");
});

app.get("/", (req, res) => res.send("Hello World !"));
