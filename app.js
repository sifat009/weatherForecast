const request = require('request');
const secretKey = `82c0f0bcc74666e483a62d8eb71900f9`;
const API_URL = `https://api.darksky.net/forecast`;

const place = process.argv[2];

const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoidGVzdDMzNDM0MzQzNDMiLCJhIjoiY2swN3g1YWw0NDNxejNicDBoMm1jMjNwbiJ9.s2iMpU83XeCr3nSlQoUF2w`;


request({ 'url': geocodeUrl, 'json': true}, (error, res, {features}) => {
    if(error) {
        console.error(error);
    } else if (features === undefined || !features.length) {
        console.error('Please insert a valid location.')
    } else {
        const [long, lat] = features[0].geometry.coordinates;
        const WeatherAPI = `${API_URL}/${secretKey}/${lat},${long}?units=si`;
        request({'url': WeatherAPI, 'json': true}, (error, res, body) => {
            const {currently} = body;
            if(error) {
                console.error(error)
            } else {
                const {temperature, summary} = currently;
                console.log({temperature, summary})
            }
        })
    }
})