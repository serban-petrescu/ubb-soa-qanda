const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

function sendEmail(to, subject, html) {
    const mailOptions = { from: process.env.SMTP_SENDER, to, subject, html };
    return new Promise(function(resolve, reject) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    })
}

module.exports = {
    sendEmail
};
