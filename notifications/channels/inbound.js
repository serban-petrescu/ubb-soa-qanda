const amqp = require('amqplib');
const EventEmitter = require('events');

let emitter = new EventEmitter();

const NAME = 'notifications';

amqp.connect(process.env.INBOUND_AMQP_URL)
    .then(connection => connection.createChannel())
    .then(channel => {
        console.log('Created message queue channel.');
        return channel.assertQueue(NAME, { durable: false })
            .then(() => channel);
    })
    .then(channel => channel.consume(NAME, function (msg) {
        const { event, data } = JSON.parse(msg.content.toString());
        console.log('Received event of type ' + event + ' via queue.');
        emitter.emit(event, data);
    }));

module.exports = emitter;
