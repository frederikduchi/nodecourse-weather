const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/c5c644326ae5df86b3bedf406302008e/${longitude},${latitude}?units=si`;
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather services',undefined);
        }else if(response.body.error){
            callback('Weather is not found',undefined);
        }else{
            const current = response.body.currently;
            callback(undefined,`It is currently ${current.temperature} degrees out.  There is a ${current.precipProbability}% chance of rain.`);
        }
    });  
 }
 
 module.exports = forecast;