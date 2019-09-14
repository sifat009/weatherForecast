const express = require('express');
const app = express();
const weatherRouter = require('./api/weather');
const hbs = require('hbs');
const path = require('path');

const staticPath = path.join(__dirname, 'public');
const partialsPath = path.join(__dirname, './layouts/partials');
const viewsPath = path.join(__dirname, './layouts/views');

// setting static path

app.use(express.static(staticPath));


// changing the default view and adding partials

app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.set('view engine', hbs);

app.get('/', (req, res) => {
    res.render('weather.hbs', {
        title: 'Weather',
    })
})



// api routes

app.use('/api/weather', weatherRouter);



app.listen(3000, () => {
    console.log('app listening on port 3000');
})