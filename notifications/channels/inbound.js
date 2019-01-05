const amqp = require('amqplib');
const EventEmitter = require('events');

let emitter = new EventEmitter();

amqp.connect(process.env.INBOUND_AMQP_URL)
    .then(connection => connection.createChannel())
    .then(channel => {
        channel.assertQueue('notifications', { durable: false });
        return channel;
    })
    .then(channel => channel.consume('notifications', function (msg) {
        const { event, data } = JSON.parse(msg.content.toString());
        emitter.emit(event, data);
    }));

module.exports = emitter;
