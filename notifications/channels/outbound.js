const amqp = require('amqplib');

let channelPromise = amqp.connect(process.env.OUTBOUND_AMQP_URL)
    .then(connection => connection.createChannel())
    .then(channel => {
        channel.assertQueue('emails', { durable: false });
        return channel;
    })
    .catch(error => {
        console.log('Unable to establish connection to queue: ' + error);
        return { sendToQueue: () => { } };
    });

function toBuffer(to, template, data) {
    return Buffer.from(JSON.stringify({ to, template, data, subject: 'Q&A: Notification' }));
}

module.exports = {
    createEmail: function (email, type, data) {
        channelPromise.then(channel => channel.sendToQueue('emails', toBuffer(email, type, data)))
            .catch(error => console.log('Unable to send to queue: ' + error));
    }
};
