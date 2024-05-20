const amqp = require('amqplib/callback_api');
const { sendEmail } = require('./emailService');
const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || `localhost:${port}`;
const amqp_url = 'amqp://localhost'

const queue = 'email_queue';

exports.enqueueEmail = (user, subject, body) => {
    amqp.connect(amqp_url, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(queue, { durable: false });

            let emailBody = body;

            emailBody = emailBody.replace('[name]', user.name);
            emailBody = emailBody.replace('[email]', user.email);

            if (user.properties && typeof user.properties === 'object') {
                for (const [key, value] of user.properties.entries()) {
                    const placeholder = `[${key}]`;
                    emailBody = emailBody.replace(placeholder, value);
                }
            }
            
            const msg = JSON.stringify({ to: user, subject, body: emailBody });
            channel.sendToQueue(queue, Buffer.from(msg));
        });
    });
};

amqp.connect(amqp_url, (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queue, { durable: false });

        channel.consume(queue, async (msg) => {
            const { to, subject, body } = JSON.parse(msg.content.toString());
            const unsubscribeLink = `http://${domain}/emails/${to.listId}/unsubscribe?email=${encodeURIComponent(to.email)}`
            await sendEmail(to.email, subject, body, unsubscribeLink);
        }, { noAck: true });
    });
});
