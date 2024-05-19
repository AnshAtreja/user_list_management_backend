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

exports.deleteList = async (req, res, next) => {
    try {
        const { listId } = req.params;

        await User.deleteMany({ listId });

        const deletedList = await List.findByIdAndDelete(listId);

        if (!deletedList) {
            return next(new AppError('List not found', 404));
        }

        res.status(204).end(); 
    } catch (error) {
        next(error);
    }
};
