let express = require('express');
let app = express();

let powerball = require('./controllers/powerball');

app.use('/pb', powerball);

app.listen(3000, () => console.log('listening on port 3000'));
