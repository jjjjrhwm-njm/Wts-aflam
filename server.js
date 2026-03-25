require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
app.use(cors());
app.use(express.json());

// تنظيف رابط راندر لتجنب الأخطاء (حتى لو كتبته مع http أو بدون)
const rawHost = process.env.RENDER_HOST || 'wts-aflam.onrender.com';
const cleanHost = rawHost.replace(/^https?:\/\//, '').replace(/\/$/, '');

// 1. مسار النبض المركزي
app.get('/ping', (req, res) => res.send("💓 مستيقظ"));

// 2. تشغيل نظام الواتساب (سيأخذ مساراته الخاصة)
require('./whatsapp/app')(app, cleanHost);

// 3. تشغيل نظام الأفلام (سيأخذ مساراته وواجهة المستخدم)
require('./movies/app')(app);

// 4. تشغيل السيرفر المدمج والنبض
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("=".repeat(50));
    console.log(`🚀 [Master Server] يعمل بنجاح على المنفذ ${PORT}`);
    console.log(`🌐 الرابط: https://${cleanHost}`);
    console.log("=".repeat(50));

    // نظام النبض الحديدي (كل 5 دقائق) لضمان عدم نوم راندر
    setInterval(() => {
        https.get(`https://${cleanHost}/ping`, (res) => {
            if(res.statusCode === 200) console.log(`💓 نبض النظام: السيرفر مستيقظ`);
        }).on('error', () => {});
    }, 5 * 60 * 1000);
});
