const amqp = require('amqplib');

let channelPromise = amqp.connect(process.env.AMQP_URL)
    .then(connection => connection.createChannel())
    .then(channel => {
        channel.assertQueue('notifications', { durable: false });
        return channel;
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
        channelPromise.then(channel => channel.sendToQueue('notifications', toBuffer(event, data)))
            .catch(error => console.log('Unable to send to queue: ' + error));
    }
}
