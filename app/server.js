const express = require('express');
const app = express();
const compression = require('compression');

const powerball = require('./controllers/powerball');

app.use(compression());

app.use('/pb', powerball);

app.listen(3000, () => console.log('listening on port 3000'));
