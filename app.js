require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const listRoutes = require('./routes/listRoutes');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to My Mathongo Task App</h1>
        <p>API Documentation: <a href="https://documenter.getpostman.com/view/27271994/2sA3QmDZpF">Documentation</a></p>
    `);
});

app.use('/lists', listRoutes);
app.use('/users', userRoutes);
app.use('/emails', emailRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
