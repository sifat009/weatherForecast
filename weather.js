const request = require('request');
const secretKey = `82c0f0bcc74666e483a62d8eb71900f9`;
const API_URL = `https://api.darksky.net/forecast`;

const getWeather = (place, callback) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoidGVzdDMzNDM0MzQzNDMiLCJhIjoiY2swN3g1YWw0NDNxejNicDBoMm1jMjNwbiJ9.s2iMpU83XeCr3nSlQoUF2w`;
    request({ 'url': geocodeUrl, 'json': true}, (error, res, {features}) => {
        if(error) {
            callback({error, data: undefined});
        } else if (features === undefined || !features.length) {
            callback({error: 'Please insert a valid location.', data: undefined})
        } else {
            const [long, lat] = features[0].geometry.coordinates;
            const WeatherAPI = `${API_URL}/${secretKey}/${lat},${long}?units=si`;
            request({'url': WeatherAPI, 'json': true}, (error, res, body) => {
                const {currently} = body;
                if(error) {
                    callback({error, data: undefined})
                } else {
                    callback(error, currently)
                }
            })
        }
    })
}

module.exports.getWeather = getWeather;