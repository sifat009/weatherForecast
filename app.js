const {getWeather} = require('./weather');
const express = require('express');
const app = express();
const geoip = require('geoip-lite');

app.get('/', (req, res) => {
    let userIP  = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    userIP = userIP.substr(0, 7) === '::ffff:' ? userIP.substr(7) : userIP;
    const userLocation = geoip.lookup('119.148.8.82');
    res.send(userIP)
})



app.get('/api/weather', (req, res) => {
    if(req.query.location) {
        getWeather(req.query.location, (error, data)=> {
            if(error) {
                return res.send(error);
            } else {
                return res.json(data);
            }
        })
    } else {
        res.json({error: 'location is missing '})
    }
})

// const place = process.argv[2];

// getWeather(place, (error, res) => {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(res);
//     }
// })



app.listen(3000, () => {
    console.log('app listening on port 3000');
})