var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const followersSchema = require('./followers');
const followingSchema = require('./following');

const usersSchema = new Schema({
    userName: {
        type: String,
        required: true
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
    followers: [followersSchema],
    following: [followingSchema],
    bookmarked: [
        {
            tweetId: {
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ],
    liked: [
        {
            tweetId: {
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ],
    views: [
        {
            viewDate: {
                type: String
            },
            viewCounter: {
                type: Number
            }
        }
    ],
    retweets: [
        {
            tweetId: {
                type: mongoose.Schema.Types.ObjectId
            },
            retweetTime: {
                type: Date
            }
        }
    ],
    subscribed: [
        {
            listId: {
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ],
    memberOf: [
        {
            listId: {
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ]
});

const Musers = mongoose.model("Musers", usersSchema);
exports.Musers = Musers;
exports.usersSchema = usersSchema;