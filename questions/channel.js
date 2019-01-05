const amqp = require('amqplib');

const NAME = 'notifications';

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

function toBuffer(event, data) {
    return Buffer.from(JSON.stringify({ event, data }));
}

module.exports = {
    createNotification: function (event, data) {
        console.log('Sending event of type ' + event + ' via queue.');
        channelPromise.then(channel => channel.sendToQueue(NAME, toBuffer(event, data)))
            .catch(error => console.log('Unable to send to queue: ' + error));
    }
}
