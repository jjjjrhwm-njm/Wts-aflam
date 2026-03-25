const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ [Database] Connected successfully to MongoDB');
    } catch (error) {
        console.error('❌ [Database] Connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
