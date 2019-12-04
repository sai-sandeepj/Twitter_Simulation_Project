var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const commentSchema = new Schema({
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
  commentTime: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String
  },
  commentMedia: {
    type: String
  }
});

module.exports = mongoose.model("comments", commentSchema);
