var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const listsSchema = new Schema({
  userName: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  listName: {
    type: String
  },
  description: {
    type: String
  },
  members: [
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
      profileImage: {
        type: String
      }
    }
  ],
  subscribers: [
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
      profileImage: {
        type: String
      }
    }
  ]
});

const lists = mongoose.model("lists", listsSchema);
exports.lists = lists;
exports.listsSchema = listsSchema;