const mongoose = require('mongoose');
const { AppError } = require('../utils/errorHandler');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/user-management';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw new AppError('Error connecting to MongoDB', 500);
    }
};

module.exports = connectDB;
