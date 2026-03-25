const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ [Database] تم الاتصال بـ MongoDB للأفلام');
    } catch (error) { console.error('❌ فشل الاتصال:', error.message); }
};
module.exports = connectDB;
