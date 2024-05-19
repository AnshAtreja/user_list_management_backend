const List = require('../models/List');
const User = require('../models/User')

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

//Not needed according to the requirements of task, created for testing purposes
exports.deleteList = async (req, res, next) => {
    try {
        const { listId } = req.params;
        
        const list = await List.findById(listId);

        if (!list) {
            return res.status(404).send({ error: 'List not found' });
        }
        
        await List.findByIdAndDelete(listId);
        
        await User.deleteMany({ listId });

        res.status(200).send({ message: 'List and associated users deleted successfully' });
    } catch (error) {
        next(error);
    }
};

//Not needed according to the requirements of task, created for testing purposes
exports.getAllLists = async (req, res, next) => {
    try {
        const lists = await List.find();
        res.status(200).send(lists);
    } catch (err) {
        next(err);
    }
};
