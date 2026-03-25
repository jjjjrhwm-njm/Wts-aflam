const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/env');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ [Database] Connected successfully to MongoDB');
    } catch (error) {
        console.error('❌ [Database] Connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
