const {getWeather} = require('./weather');
const express = require('express');
const app = express();
const geoip = require('geoip-lite');

app.get('/api/weather', (req, res) => {
    let userLocation;
    if(req.query.location) {
        userLocation = req.query.location;
    } else {
        const userIP = req.ip.substr(0, 7) === '::ffff:' ? req.ip.substr(7) : req.ip;
        if(userIP === '127.0.0.1') {
            userLocation = 'Amazon';
        } else {
            userLocation = geoip.lookup(userIP).city;
        }
    }
    getWeather(userLocation, (error, data)=> {
        if(error) {
            return res.send(error);
        } else {
            return res.json(data);
        }
    })
})



app.listen(3000, () => {
    console.log('app listening on port 3000');
})