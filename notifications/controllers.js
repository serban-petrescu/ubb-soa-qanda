const PreferenceModel = require('./models').PreferenceModel;
const defaults = require('./models').defaults;
const CastError = require('mongoose').CastError;
const webPush = require('web-push');

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
                    return PreferenceModel.create({
                        userId,
                        push: { ...defaults.push, ...push },
                        email: { ...defaults.email, ...email },
                        emailAddress
                    });
                }
            })
    },
    updateSubscription: function(userId, subscription = null) {
        return PreferenceModel.findOne({ userId })
            .then(preference => {
                if (preference) {
                    console.log('Updating subscription for user ' + userId + '.');
                    preference.subscription = subscription;
                    preference.markModified('subscription');
                    return preference.save();
                } else {
                    console.log('Creating new preferences due to subscription update for user ' + userId + '.');
                    return PreferenceModel.create({ userId, ...defaults, subscription, emailAddress: userId });
                }
            })
    }
};

webPush.setVapidDetails(
    'mailto:Serban.Petrescu@outlook.com',
    'BOeHKmZfdgeDkAc0Y3lDzffkODdcAevk5YgqtTX2JCmLRhSgf1QPDRT-t8wIVIw9IdixkAds3A0TrRRanJRKsIA',
    'bjdP3hp6S3alHK-woPPNhWikRTqDUNiyk-a23KwxlNk'
);

const NotificationController = {
    send: function(userId, type, data) {
        PreferencesController.read(userId).then(preference => {
            if (preference.email[type]) {
                outbound.createEmail(preference.emailAddress, type, data);
            }
            if (preference.push[type] && preference.subscription) {
                console.log('Sending push notification to user: ' + userId + '.');
                webPush.sendNotification(preference.subscription, JSON.stringify({ type, data }));
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
