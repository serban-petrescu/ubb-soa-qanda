const amqp = require('amqplib');
const sender = require('./sender');
const renderer = require('./renderer');

const onError = e => console.log('Unable to send email: ' + e);

const NAME = 'emails';

amqp.connect(process.env.AMQP_URL)
    .then(connection => connection.createChannel())
    .then(channel => {
        console.log('Created message queue channel.');
        return channel.assertQueue(NAME, { durable: false })
            .then(() => channel);
    })
    .then(channel => channel.consume(NAME, function (msg) {
        try {
            const { to, template, data, subject } = JSON.parse(msg.content.toString());
            console.log('Received email generation request for ' + to + ' via queue.');
            const html = renderer.render(template, data);
            sender.sendEmail(to, subject, html).catch(onError);
        } catch (e) {
            onError(e);
        }
    }));
