const csv = require('csv-parser');
const fs = require('fs');

async function parseCSV(filePath, customPropertiesMap, results, errors) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                const user = {};
                for (const key in data) {
                    if (customPropertiesMap[key]) {
                        user[key] = data[key] || customPropertiesMap[key];
                    } else {
                        user[key] = data[key];
                    }
                }
                results.push(user);
            })
            .on('end', () => {
                resolve();
            })
            .on('error', (error) => {
                errors.push(error.message);
                reject(error);
            });
    });
}

module.exports = { parseCSV };
