const amqp = require('amqplib');
const sender = require('./sender');
const renderer = require('./renderer');

const onError = e => console.log('Unable to send email: ' + e);

amqp.connect(process.env.AMQP_URL)
    .then(connection => connection.createChannel())
    .then(channel => {
        channel.assertQueue('email', { durable: false });
        return channel;
    })
    .then(channel => channel.consume('email', function (msg) {
        try {
            const { to, template, data, subject } = JSON.parse(msg.content.toString());
            const html = renderer.render(template, data);
            sender.sendEmail(to, subject, html).catch(onError);
        } catch (e) {
            onError(e);
        }
    }));
