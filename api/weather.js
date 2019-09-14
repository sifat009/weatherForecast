const {getWeather} = require('../weather');
const geoip = require('geoip-lite');
const {Router} = require('express');
const router = Router();

router
    .route('/')
    .get((req, res) => {
        let userLocation;
        if(req.query.location) {
            userLocation = req.query.location;
        } else {
            const userIP = req.ip.substr(0, 7) === '::ffff:' ? req.ip.substr(7) : req.ip;
            userLocation = geoip.lookup(userIP) ? geoip.lookup(userIP).city : geoip.lookup('119.148.8.82').city;
        }
        getWeather(userLocation, (error, data)=> {
            if(error) {
                return res.send(error);
            } else {
                return res.json({location: userLocation, ...data});
            }
        })
    })



module.exports = router;