const amqp = require('amqplib');

const NAME = 'emails';

let channelPromise = amqp.connect(process.env.AMQP_URL)
    .then(connection => connection.createChannel())
    .then(channel => {
        console.log('Created message queue channel.');
        return channel.assertQueue(NAME, { durable: false })
            .then(() => channel);
    })
    .catch(error => {
        console.log('Unable to establish connection to queue: ' + error);
        return { sendToQueue: () => { } };
    });

function toBuffer(to, template, data) {
    return Buffer.from(JSON.stringify({ to, template, data, subject: 'Q&A: Confirm Registration' }));
}

module.exports = {
    createEmail: function (email, type, data) {
        console.log('Enqueueing email towards ' + email + ' in message queue.');
        channelPromise.then(channel => channel.sendToQueue(NAME, toBuffer(email, type, data)))
            .catch(error => console.log('Unable to send to queue: ' + error));
    }
};
