const List = require('../models/List');
const { handleValidationErrorDB } = require('../utils/errorHandler');

exports.createList = async (req, res, next) => {
    try {
        const { title, customProperties } = req.body;
        const list = new List({ title, customProperties });
        await list.save();
        res.status(201).send(list);
    } catch (err) {
        next(err);
    }
};
