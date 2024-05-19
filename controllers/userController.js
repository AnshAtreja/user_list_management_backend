const fs = require('fs');
const User = require('../models/User');
const List = require('../models/List');
const { parseCSV } = require('../utils/csvParser');
const AppError = require('../utils/errorHandler');

exports.addUsers = async (req, res, next) => {
    try {
        const { listId } = req.params;

        const list = await List.findById(listId);
        if (!list) {
            throw new AppError('List not found', 404);
        }

        const { successCount, failureCount, errors } = await processUsers(req.file.path, listId, list.customProperties);

        fs.unlinkSync(req.file.path);

        const totalCount = await User.countDocuments({ listId });

        res.status(200).send({
            successCount,
            failureCount,
            errors,
            totalCount
        });
    } catch (err) {
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        next(err);
    }
};

async function processUsers(filePath, listId, customProperties) {
    const customPropertiesMap = customProperties.reduce((acc, prop) => {
        acc[prop.title] = prop.fallbackValue;
        return acc;
    }, {});

    const results = [];
    const errors = [];

    await parseCSV(filePath, customPropertiesMap, results, errors);

    let successCount = 0;
    let failureCount = 0;

    for (const userData of results) {
        try {
            userData.listId = listId;

            const properties = {};
            for (const key in userData) {
                if (!['name', 'email', 'listId'].includes(key)) {
                    properties[key] = userData[key];
                    delete userData[key]; 
                }
            }
            userData.properties = properties;

            const newUser = new User(userData);
            await newUser.save();
            successCount++;
        } catch (err) {
            if (err.code === 11000) {
                errors.push({ user: userData, error: 'Duplicate email within the same list' });
            } else {
                errors.push({ user: userData, error: err.message });
            }
            failureCount++;
        }
    }

    return { successCount, failureCount, errors };
}
