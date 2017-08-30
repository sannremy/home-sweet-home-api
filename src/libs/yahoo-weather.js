const config = require('../configs/home-sweet-home');
const YQL = require('yql');

class YahooWeather {
  static getWeather() {
    let query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + config.yahooWeather.location + '") and u="' + config.yahooWeather.temperature_unit + '"');

    return new Promise((resolve, reject) => {
      query.exec((err, data) => {
        if (err) {
          return reject(err);
        }

        let forecast = data.query.results.channel.item.forecast;

        let temperature = data.query.results.channel.item.condition.temp;

        let sunrise = data.query.results.channel.astronomy.sunrise;
        let sunset = data.query.results.channel.astronomy.sunset;

        return resolve({
          forecast: forecast,
          temperature: temperature,
          sunrise: sunrise,
          sunset: sunset
        });
      });
    });
  }
}

module.exports = YahooWeather;
