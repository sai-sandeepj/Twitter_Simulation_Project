var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const { commentSchema } = require('./comments');

const tweetSchema = new Schema({
    userName: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    profileImage: {
        type: String
    },
    tweetMsg: {
        type: String
    },
    tweetDate: {
        type: String
    },
    tweetMedia: {
        type: String
    },
    tweetViewCounter: {
        type: Number
    },
    isRetweet: {
        type: Boolean,
        default: false
    },
    // parentId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   default: null
    // },
    parentTweetDetails: [
        {
            parentId: {
                type: mongoose.Schema.Types.ObjectId
            },
            parentUserName: {
                type: String
            },
            parentFirstName: {
                type: String
            },
            parentLastName: {
                type: String
            },
            parentProfileImage: {
                type: String
            },
            parentTweetMsg: {
                type: String
            },
            parentTweetMedia: {
                type: String
            }
        }
    ],
    likes: [
        {
            userName: {
                type: String
            },
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            aboutMe: {
                type: String
            },
            profileImage: {
                type: String
            }
        }
    ],
    tweetViews: [
        {
            viewDate: {
                type: String
            },
            viewCounter: {
                type: Number
            },
            viewTimeStamp: {
                type: Date
            }
        }
    ],
    comments: [commentSchema],
    hashtags: [],
    retweetNoComment: [
        {
            userName: {
                type: String
            },
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            aboutMe: {
                type: String
            },
            profileImage: {
                type: String
            }
        }
    ]
});

const tweets = mongoose.model("tweets", tweetSchema);
exports.tweets = tweets;
exports.tweetSchema = tweetSchema;