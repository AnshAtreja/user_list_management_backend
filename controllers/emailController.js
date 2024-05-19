const List = require('../models/List');
const User = require('../models/User');
const { enqueueEmail } = require('../services/queueService');

exports.sendEmails = async (req, res, next) => {
    try {
        const { listId } = req.params;
        const { subject, body } = req.body;

        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).send({ error: 'List not found' });
        }

        const users = await User.find({ listId });
        users.forEach(user => {
            enqueueEmail(user, subject, body);
        });

        res.status(200).send({ message: 'Emails queued successfully' });
    } catch (err) {
        next(err); 
    }
};

exports.unsubscribe = async (req, res, next) => {
    try {
        const { listId } = req.params;
        const { email } = req.query; 

        await User.deleteOne({ listId, email });

        res.status(200).send({ message: `User with email ${email} unsubscribed successfully` });
    } catch (err) {
        next(err); 
    }
};


