const PreferenceModel = require('./models').PreferenceModel;
const defaults = require('./models').defaults;
const CastError = require('mongoose').CastError;

const inbound = require('./channels/inbound');
const outbound = require('./channels/outbound');

const PreferencesController = {
    read: function(userId) {
        return PreferenceModel.findOne({ userId }).exec()
            .then(p => {
                console.log('Read preference for user ' + userId + ':' + p);
                return p || { ...defaults, emailAddress: userId };
            });
    },
    upsert: function(userId, emailAddress, push = { }, email = { }) {
        return PreferenceModel.findOne({ userId })
            .then(preference => {
                if (preference) {
                    preference.emailAddress = emailAddress || preference.emailAddress;
                    preference.email = { ...defaults.email, ...email };
                    preference.push = { ...defaults.push, ...push };
                    return preference.save();
                } else {
                    return PreferenceModel.create({ userId, ...defaults, emailAddress });
                }
            });
    }
};

const NotificationController = {
    send: function(userId, type, data) {
        PreferencesController.read(userId).then(preference => {
            if (preference.email[type]) {
                outbound.createEmail(preference.emailAddress, type, data);
            }
            if (preference.push[type]) {
                // TODO add websocket support
            }
        });
    }
}

inbound.on('questionUpdated', ({ question }) => {
    (question.answers || [])
        .map(a => a.userId)
        .filter(userId => userId !== question.userId)
        .forEach(userId => NotificationController.send(userId, 'questionUpdated', question));
});

inbound.on('questionAnswered', ({ question, answer }) => {
    if (question.userId !== answer.userId) {
        NotificationController.send(question.userId, 'questionAnswered', { question, answer });
    }
});

inbound.on('answerUpdated', ({ question, answer }) => {
    if (question.userId !== answer.userId) {
        NotificationController.send(question.userId, 'answerUpdated', { question, answer });
    }
});

module.exports = {
    CastError,
    PreferencesController
};
