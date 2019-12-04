var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const messagesSchema = new Schema({
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    messages: [
        {
            sent_by: {
                type: String
            },
            message: {
                type: String
            },
            messageTime: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const messages = mongoose.model("messages", messagesSchema);
exports.messages = messages;
exports.messagesSchema = messagesSchema;