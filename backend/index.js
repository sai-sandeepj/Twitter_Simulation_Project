var express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require("cors");
var mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

//Storing documents/Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    }
    , filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


const signUp = require('./routes/signUp');
const login = require('./routes/login');
const getProfile = require('./routes/getProfile');
const addNewTweet = require('./routes/addNewTweet');
const getUserTweets = require('./routes/getUserTweets');
const updateProfile = require('./routes/updateProfile');
const addNewList = require('./routes/addNewList');
const getListsbyUserName = require('./routes/getListsByUserName');
const findUsers = require('./routes/findUsers')
const addMembersToList = require('./routes/addMembersToList')
const deleteMemberFromList = require('./routes/deleteMemberFromList')
const deleteList = require('./routes/deleteList')
const getUserMemberOfLists = require('./routes/getUserMemberOfLists')
const getUserSubscribedLists = require('./routes/getUserSubscribedLists')
const subscribeToList = require('./routes/subscribeToList')
const followUser = require('./routes/followUser')
const unfollowUser = require('./routes/unfollowUser')
const editList = require('./routes/editList')
const getAllTweetsFollowing = require("./routes/getAllTweetsFollowing");
const retweetWithoutComment = require("./routes/retweetWithoutComment");
const retweetWithComment = require("./routes/retweetWithComment");
const addCommentOnTweet = require("./routes/addCommentOnTweet");
const likeATweet = require("./routes/likeATweet");
const bookmarkATweet = require("./routes/bookmarkATweet");
const getUserBookmarkedTweetIds = require("./routes/getUserBookmarkedTweetIds");
const getUserLikedTweetIds = require("./routes/getUserLikedTweetIds");
const getUserRetweetIds = require("./routes/getUserRetweetIds");
const getConversations = require("./routes/getConversations");
const getMessages = require("./routes/getMessages");
const setMessage = require("./routes/setMessage");
const getUserLikedTweets = require('./routes/getUserLikedTweets')
const getUserBookmarkedTweets = require('./routes/getUserBookmarkedTweets')
const getTweet = require('./routes/getTweet')
const getTweetsOfMembersInList = require('./routes/getTweetsOfMembersInList')
const getProfileViews = require("./routes/getProfileViews");
const getTop10LikedTweets = require("./routes/getTop10LikedTweets");
const getTop10ViewedTweets = require("./routes/getTop10ViewedTweets");
const getTop5RetweetedTweets = require("./routes/getTop5RetweetedTweets");
const searchByHashTag = require("./routes/searchByHashTag");
const deleteRetweet = require("./routes/deleteRetweet");
const deActivateAccount = require("./routes/deActivateAccount");
const deleteTweet = require('./routes/deleteTweet')

const getDailyTweets = require('./routes/getDailyTweets')
const getHourlyTweets = require('./routes/getHourlyTweets')
const getMonthlyTweets = require('./routes/getMonthlyTweets')


app.use("/", getDailyTweets)
app.use("/", getHourlyTweets)
app.use("/", getMonthlyTweets)

app.use('/', signUp);
app.use('/', getUserTweets);
app.use('/', login);
app.use('/', getProfile);
app.use('/', addNewTweet);
app.use('/', updateProfile);
app.use('/', addNewList);
app.use('/', getListsbyUserName);
app.use('/', findUsers);
app.use('/', addMembersToList);
app.use('/', deleteMemberFromList);
app.use('/', deleteList);
app.use('/', getUserMemberOfLists);
app.use('/', getUserSubscribedLists);
app.use('/', subscribeToList);
app.use('/', followUser);
app.use('/', unfollowUser);
app.use('/', editList)
app.use("/", addCommentOnTweet);
app.use("/", likeATweet);
app.use("/", bookmarkATweet);
app.use("/", getUserBookmarkedTweetIds);
app.use("/", getUserLikedTweetIds);
app.use("/", retweetWithoutComment);
app.use("/", retweetWithComment);
app.use("/", getUserRetweetIds);
app.use("/", getConversations);
app.use("/", setMessage)
app.use("/", getMessages)
app.use("/", getAllTweetsFollowing);
app.use('/', getUserLikedTweets);
app.use('/', getUserBookmarkedTweets);
app.use('/', getTweet);
app.use('/', getTweetsOfMembersInList)
app.use("/", getProfileViews);
app.use("/", getTop10LikedTweets);
app.use("/", getTop10ViewedTweets);
app.use("/", getTop5RetweetedTweets);
app.use("/", searchByHashTag);
app.use("/", deleteRetweet);
app.use("/", deActivateAccount);
app.use("/", deleteTweet);

//uplaod-file
app.post('/upload-file', upload.array('photos', 5), (req, res) => {
    console.log('req.body', req.body);
    res.end();
});

//download-file
app.get('/download-file/:user_image', (req, res) => {
    var image = path.join(__dirname + '/uploads', req.params.user_image);
    console.log("image", image)
    if (fs.existsSync(image)) {
        res.sendFile(image)
    }
    else {
        res.end("image not found")
    }
});

app.listen(3001, () => {
    console.log('server is running on port 3001');
});