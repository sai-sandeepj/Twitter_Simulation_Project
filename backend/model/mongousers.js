var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const followersSchema = require("./followers");
const followingSchema = require("./following");

const usersSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  firstName: {
    type: String
    //required: true
  },
  lastName: {
    type: String
    //required: true
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
        type: Date
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
  ]
});

module.exports = mongoose.model("mongousers", usersSchema);
