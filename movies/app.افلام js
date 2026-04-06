const express = require('express');
const path = require('path');
const connectDB = require('./db');

module.exports = function(app) {
    // 1. الاتصال بقاعدة بيانات الأفلام MongoDB
    connectDB();

    // 2. تشغيل بوت تليجرام الخاص بالأفلام (توكن منفصل)
    require('./telegram-bot');
    console.log('🤖 [Movies Bot] يعمل الآن وينتظر أمر: نجم أفلام');

    // 3. مسارات (APIs) تطبيق الأفلام
    app.use('/api/content', require('./routes/content'));
    app.use('/api/auth', require('./routes/auth'));

    // 4. تشغيل الواجهة الرئيسية (الواجهة الأمامية للأفلام)
    app.use(express.static(path.join(__dirname, 'public')));
    
    // أي رابط لا يخص الواتساب أو الأفلام سيحوله لصفحة الأفلام الرئيسية
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
};
