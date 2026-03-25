const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');

const app = express();

// إعدادات الـ Middleware الأساسية
app.use(cors());
app.use(express.json());

// نظام النبض (Ping) كل 5 دقائق لـ process.env.RENDER_HOST
setInterval(() => {
    const host = process.env.RENDER_HOST;
    if (host) {
        https.get(`https://${host}/ping`, (res) => {
            console.log('💓 نبض النظام: مستقر');
        }).on('error', () => {});
    }
}, 5 * 60 * 1000);

// ============================================
// ربط وحدة الواتساب (تمرير تطبيق express)
// ============================================
require('./whatsapp/app')(app);

// ============================================
// ربط مسارات الأفلام
// ============================================
app.use('/api/content', require('./movies/routes/content'));
app.use('/api/auth', require('./movies/routes/auth'));

// ============================================
// تقديم الملفات الثابتة للواجهة الأمامية للأفلام
// ============================================
app.use(express.static(path.join(__dirname, 'movies', 'public')));

// ============================================
// أي مسار غير موجود يعرض صفحة الأفلام الرئيسية
// ============================================
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'movies', 'public', 'index.html'));
});

// ============================================
// تشغيل السيرفر (لا توجد app.listen هنا لأن الواتساب لا يقوم بتشغيله)
// ============================================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 السيرفر الرئيسي يعمل على المنفذ ${PORT}`);
    console.log(`🌐 الرابط: https://${process.env.RENDER_HOST}`);
    console.log('='.repeat(50));
});
