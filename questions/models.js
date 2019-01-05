const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteMap = {
    type: Map,
    of: Boolean
};

const QuestionSchema = new Schema({
    userId: String,
    title: String,
    text: String,
    votes: VoteMap,
    created: { type: Date, default: Date.now },
    answers: [{
        userId: String,
        text: String,
        votes: VoteMap,
        created: { type: Date, default: Date.now }
    }]
});

module.exports = {
    QuestionModel: mongoose.model('Question', QuestionSchema)
};
