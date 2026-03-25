require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    BOT_TOKEN: process.env.BOT_TOKEN,
    ADMIN_ID: process.env.ADMIN_ID,
    STORAGE_CHANNEL: '@nejm_njm',
    SESSION_SECRET: process.env.SESSION_SECRET
};
