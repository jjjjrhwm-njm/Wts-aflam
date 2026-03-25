const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: String, enum: ['movie', 'series'], default: 'movie' },
    genre: { type: String, default: 'مضاف حديثاً' },
    poster: { type: String, required: true },
    isVIP: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', contentSchema);
