var mongoose = require("mongoose");

const followingSchema = new mongoose.Schema({
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
});

module.exports = followingSchema;
