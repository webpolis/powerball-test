const express = require('express');
const router = express.Router();
const apicache = require('apicache').options({
    debug: true
}).middleware;
const pbConfig = require('../config/powerball');

import importer from '../importers/powerball';

const pb = new importer();
const error = (err) => {
    throw err;
};

router.get('/jackpot', apicache(pbConfig.cache.jackpot), (req, res) => {
    pb.fetch().then((data) => res.send({
        jackpot: data[0]
    })).catch(error);
});

router.get('/winners', apicache(pbConfig.cache.winners), (req, res) => {
    pb.fetch().then((data) => res.send({
        winners: data[1]
    })).catch(error);
});

router.get('/all', apicache(pbConfig.cache.all), (req, res) => {
    pb.fetch().then((data) => res.send({
        jackpot: data[0],
        winners: data[1]
    })).catch(error);
});

module.exports = router;
