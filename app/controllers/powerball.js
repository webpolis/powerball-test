let express = require('express');
let router = express.Router();

import importer from '../importers/powerball';

const pb = new importer();

router.get('/jackpot', (req, res) => {
    pb.init().then((data) => res.json(data.jackpot));
});

router.get('/winners', (req, res) => {
    pb.init().then((data) => res.json(data.winners));
});

module.exports = router;
