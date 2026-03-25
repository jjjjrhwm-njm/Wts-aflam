const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const axios = require('axios');
const bot = require('../telegram-bot'); 

router.get('/', async (req, res) => {
    try {
        const movies = await Content.find({ isVIP: false }).sort({ createdAt: -1 });
        res.json({ success: true, data: movies });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/vip', async (req, res) => {
    try {
        const vipMovies = await Content.find({ isVIP: true }).sort({ createdAt: -1 });
        res.json({ success: true, data: vipMovies });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/stream/:fileId', async (req, res) => {
    try {
        const link = await bot.getFileLink(req.params.fileId);
        res.redirect(link); 
    } catch (error) {
        res.status(500).send('Error streaming from storage');
    }
});

router.get('/image/:fileId', async (req, res) => {
    try {
        const link = await bot.getFileLink(req.params.fileId);
        const response = await axios({ method: 'GET', url: link, responseType: 'stream' });
        res.setHeader('Content-Type', 'image/jpeg');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Error loading image');
    }
});

module.exports = router;
