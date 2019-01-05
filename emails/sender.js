const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_PORT === '465',
    tls: { rejectUnauthorized: false },
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

function sendEmail(to, subject, html) {
    console.log('Sending email to ' + to + '.');
    return transporter.sendMail({ from: process.env.SMTP_SENDER, to, subject, html });
}

module.exports = {
    sendEmail
};
