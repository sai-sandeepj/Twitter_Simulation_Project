var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const messagesSchema = new Schema({
    // sender: {
    //     type: String
    // },
    sender:
    {
        senderUserName: {
            type: String
        },
        senderFirstName: {
            type: String
        },
        senderLastName: {
            type: String
        },
        senderProfileImage: {
            type: String
        }
    }
    ,
    // receiver: {
    //     type: String
    // },
    receiver:
    {
        receiverUserName: {
            type: String
        },
        receiverFirstName: {
            type: String
        },
        receiverLastName: {
            type: String
        },
        receiverProfileImage: {
            type: String
        }
    }
    ,
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


module.exports = mongoose.model("messages", messagesSchema);