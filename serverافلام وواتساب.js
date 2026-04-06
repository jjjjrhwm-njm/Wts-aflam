const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');

const app = express();

// إعدادات الـ Middleware الأساسية
app.use(cors());
app.use(express.json());

// نظام النبض (Ping) كل 5 دقائق
setInterval(() => {
    const host = process.env.RENDER_HOST;
    if (host) {
        https.get(`https://${host}/ping`, (res) => {
            console.log('💓 نبض النظام: مستقر');
        }).on('error', () => {});
    }
}, 5 * 60 * 1000);

// ============================================
// 1. تشغيل قاعدة بيانات وبوت الأفلام (كان ديب سيك قد نسيها)
// ============================================
require('./movies/db')();
require('./movies/telegram-bot');

// ============================================
// 2. ربط وحدة الواتساب
// ============================================
require('./whatsapp/app')(app);

// ============================================
// 3. ربط مسارات الأفلام
// ============================================
app.use('/api/content', require('./movies/routes/content'));
app.use('/api/auth', require('./movies/routes/auth'));

// ============================================
// 4. تقديم الملفات الثابتة (موقع الأفلام)
// ============================================
app.use(express.static(path.join(__dirname, 'movies', 'public')));

// ============================================
// 5. أي مسار غير موجود يعرض موقع الأفلام
// ============================================
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'movies', 'public', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 السيرفر الرئيسي يعمل على المنفذ ${PORT}`);
    console.log(`🌐 الرابط: https://${process.env.RENDER_HOST}`);
    console.log('='.repeat(50));
});
