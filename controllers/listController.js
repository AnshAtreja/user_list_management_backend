const List = require('../models/List');

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
// exports.deleteList = async (req, res, next) => {
//     try {
//         const { listId } = req.params;
        
//         const list = await List.findById(listId);

//         if (!list) {
//             return res.status(404).send({ error: 'List not found' });
//         }
        
//         await User.deleteMany({ listId });

//         await List.findByIdAndDelete(listId);

//         res.status(200).send({ message: 'List and associated users deleted successfully' });
//     } catch (error) {
//         next(error);
//     }
// };
