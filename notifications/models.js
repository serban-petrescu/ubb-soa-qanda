const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Settings = {
    questionAnswered: Boolean,
    questionUpdated: Boolean,
    answerUpdated: Boolean
};

const PreferenceSchema = new Schema({
    userId: String,
    push: Settings,
    email: Settings,
    emailAddress: String
});

module.exports = {
    PreferenceModel: mongoose.model('Preference', PreferenceSchema),
    defaults: {
        push: {
            questionAnswered: true,
            questionUpdated: true,
            answerUpdated: true
        },
        email: {
            questionAnswered: true,
            questionUpdated: false,
            answerUpdated: false
        }
    }
};
