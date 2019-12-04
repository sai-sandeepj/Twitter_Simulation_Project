var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://nithin:nithin@grubhubtest-ly2ht.mongodb.net/273Twitter?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 100, 'useCreateIndex': true }, (err) => {
        if (err) {
            console.log("Could not connect to database", err);
            resizeBy.status(500).end("Could not connect to database" + err);
        }
        console.log("mongoose server running");
    }
);

module.exports = { mongoose };