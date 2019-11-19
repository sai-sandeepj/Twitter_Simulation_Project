var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const commentSchema = require('./comments').schema;

const tweetSchema = new Schema({
    userName: {
        type: String
    },
    tweetMsg:{
        type: String
    },
    tweetDate:{
        type: Date
    },
    tweetMedia: {
        type: String
    },
    isRetweet: {
        type: Boolean,
        default: false
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    likes: [{userName: {
        type: String
    }}],
    comments: [commentSchema],
    retweetNoComment: [{
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
    }]
});

module.exports = mongoose.model('tweets',tweetSchema);