require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendEmail = (to, subject, body, unsubscribeLink) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: `${body}<br><br><a href="${unsubscribeLink}">Unsubscribe</a>`
    };

    return transporter.sendMail(mailOptions);
};

