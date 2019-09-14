const express = require('express');
const app = express();
const weatherRouter = require('./api/weather');



app.use('/api/weather', weatherRouter);

app.listen(3000, () => {
    console.log('app listening on port 3000');
})