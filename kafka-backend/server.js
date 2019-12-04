var connection = new require("./kafka/Connection");
const mongoose = require("mongoose");
const config = require("./configFiles/MysqlConnectionPooling");

// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb+srv://nithin:nithin@grubhubtest-ly2ht.mongodb.net/Test?retryWrites=true&w=majority',
//     { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 100, 'useCreateIndex': true }, (err) => {
//         if (err) {
//             console.log("Could not connect to database", err);
//             resizeBy.status(500).end("Could not connect to database" + err);
//         }
//         console.log("mongoose server running");
//     }
// );


//topics files
var addCommentOnTweetService = require("./services/addCommentOnTweetService");
var addMembersToListService = require("./services/addMembersToListService");
var addNewListService = require("./services/addNewListService");
var addNewTweetService = require("./services/addNewTweetService");
var bookmarkATweetService = require("./services/bookmarkATweetService");
var deActivateAccountService = require("./services/deActivateAccountService");
var deleteListService = require("./services/deleteListService");
var deleteMemberFromListService = require("./services/deleteMemberFromListService");
var deleteRetweetService = require("./services/deleteRetweetService");
var deleteTweetService = require("./services/deleteTweetService");
var editListService = require("./services/editListService");
var findUsersService = require("./services/findUsersService");
var followUserService = require("./services/followUserService");
var getAllTweetsFollowingService = require("./services/getAllTweetsFollowingService");
var getConversationsService = require("./services/getConversationsService");
var getDailyTweetsService = require("./services/getDailyTweetsService");
var getHourlyTweetsService = require("./services/getHourlyTweetsService");
var getListsByUserNameService = require("./services/getListsByUserNameService");
var getMessagesService = require("./services/getMessagesService");
var getMonthlyTweetsService = require("./services/getMonthlyTweetsService");
var getProfileService = require("./services/getProfileService");
var getProfileViewsService = require("./services/getProfileViewsService");
var getTop5RetweetedTweetsService = require("./services/getTop5RetweetedTweetsService");
var getTop10LikedTweetsService = require("./services/getTop10LikedTweetsService");
var getTop10ViewedTweetsService = require("./services/getTop10ViewedTweetsService");
var getTweetService = require("./services/getTweetService");
var getTweetsOfMembersInListService = require("./services/getTweetsOfMembersInListService");
var getUserBookmarkedTweetIdsService = require("./services/getUserBookmarkedTweetIdsService");
var getUserBookmarkedTweetsService = require("./services/getUserBookmarkedTweetsService");
var getUserLikedTweetIdsService = require("./services/getUserLikedTweetIdsService");
var getUserLikedTweetsService = require("./services/getUserLikedTweetsService");
var getUserMemberOfListsService = require("./services/getUserMemberOfListsService");
var getUserRetweetIdsService = require("./services/getUserRetweetIdsService");
var getUserSubscribedListsService = require("./services/getUserSubscribedListsService");
var getUserTweetsService = require("./services/getUserTweetsService");
var likeATweetService = require("./services/likeATweetService");
var loginService = require("./services/loginService");
var retweetWithCommentService = require("./services/retweetWithCommentService");
var retweetWithoutCommentService = require("./services/retweetWithoutCommentService");
var searchByHashTagService = require("./services/searchByHashTagService");
var setMessageService = require("./services/setMessageService");
var signUpService = require("./services/signUpService");
var subscribeToListService = require("./services/subscribeToListService");
var unfollowUserService = require("./services/unfollowUserService");
var updateProfileService = require("./services/updateProfileService");

//Handle topic request
function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log("server is running ");
    consumer.on("message", function (message) {
        console.log("message received for " + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log("after handle" + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res,
                        err: err
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                if (err) {
                    console.log("error when producer sending data", err);
                } else {
                    console.log("producer send", data);
                }
            });
            return;
        });
    });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("addCommentOnTweet_topic", addCommentOnTweetService);
handleTopicRequest("addMembersToList_topic", addMembersToListService);
handleTopicRequest("addNewList_topic", addNewListService);
handleTopicRequest("addNewTweet_topic", addNewTweetService);
handleTopicRequest("bookmarkATweet_topic", bookmarkATweetService);
handleTopicRequest("deActivateAccount_topic", deActivateAccountService);
handleTopicRequest("deleteList_topic", deleteListService);
handleTopicRequest("deleteMemberFromList_topic", deleteMemberFromListService);
handleTopicRequest("deleteRetweet_topic", deleteRetweetService);
handleTopicRequest("deleteTweet_topic", deleteTweetService);
handleTopicRequest("editList_topic", editListService);
handleTopicRequest("findUsers_topic", findUsersService);
handleTopicRequest("followUser_topic", followUserService);
handleTopicRequest("getAllTweetsFollowing_topic", getAllTweetsFollowingService);
handleTopicRequest("getConversations_topic", getConversationsService);
handleTopicRequest("getDailyTweets_topic", getDailyTweetsService);
handleTopicRequest("getHourlyTweets_topic", getHourlyTweetsService);
handleTopicRequest("getListsByUserName_topic", getListsByUserNameService);
handleTopicRequest("getMessages_topic", getMessagesService);
handleTopicRequest("getMonthlyTweets_topic", getMonthlyTweetsService);
handleTopicRequest("getProfile_topic", getProfileService);
handleTopicRequest("getProfileViews_topic", getProfileViewsService);
handleTopicRequest("getTop5RetweetedTweets_topic", getTop5RetweetedTweetsService);
handleTopicRequest("getTop10LikedTweets_topic", getTop10LikedTweetsService);
handleTopicRequest("getTop10ViewedTweets_topic", getTop10ViewedTweetsService);
handleTopicRequest("getTweet_topic", getTweetService);
handleTopicRequest("getTweetsOfMembersInList_topic", getTweetsOfMembersInListService);
handleTopicRequest("getUserBookmarkedTweetIds_topic", getUserBookmarkedTweetIdsService);
handleTopicRequest("getUserBookmarkedTweets_topic", getUserBookmarkedTweetsService);
handleTopicRequest("getUserLikedTweetIds_topic", getUserLikedTweetIdsService);
handleTopicRequest("getUserLikedTweets_topic", getUserLikedTweetsService);
handleTopicRequest("getUserMemberOfLists_topic", getUserMemberOfListsService);
handleTopicRequest("getUserRetweetIds_topic", getUserRetweetIdsService);
handleTopicRequest("getUserSubscribedLists_topic", getUserSubscribedListsService);
handleTopicRequest("getUserTweets_topic", getUserTweetsService);
handleTopicRequest("likeATweet_topic", likeATweetService);
handleTopicRequest("login_topic", loginService);
handleTopicRequest("retweetWithComment_topic", retweetWithCommentService);
handleTopicRequest("retweetWithoutComment_topic", retweetWithoutCommentService);
handleTopicRequest("searchByHashTag_topic", searchByHashTagService);
handleTopicRequest("getMessages_topic", setMessageService);
handleTopicRequest("signUp_topic", signUpService);
handleTopicRequest("subscribeToList_topic", subscribeToListService);
handleTopicRequest("unfollowUser_topic", unfollowUserService);
handleTopicRequest("updateProfile_topic", updateProfileService);


module.exports = { mongoose };
