var mongoose = require('mongoose');

const followersSchema = new mongoose.Schema({
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

module.exports = followersSchema;