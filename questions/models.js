const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vote = {
    userId: String,
    positive: Boolean
};

const QuestionSchema = new Schema({
    userId: String,
    title: String,
    text: String,
    created: { type: Date, default: Date.now },
    answers: [{
        userId: String,
        text: String,
        votes: [Vote],
        created: { type: Date, default: Date.now }
    }]
});

module.exports = {
    QuestionModel: mongoose.model('Question', QuestionSchema)
};
