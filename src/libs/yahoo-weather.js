const config = require('../configs/home-sweet-home');

const YQL = require('yql');
const moment = require('moment');

class YahooWeather {
  static getWeather() {
    const query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + config.yahooWeather.location + '") and u="' + config.yahooWeather.temperature_unit + '"');

    return new Promise((resolve, reject) => {
      query.exec((err, data) => {
        if (err) {
          return reject(err);
        }

        const location = data.query.results.channel.location;
        const forecast = data.query.results.channel.item.forecast;
        const condition = data.query.results.channel.item.condition;

        // Sat, 13 Jan 2018 04:00 PM CET
        const date = moment(condition.date, 'ddd, D MMM YYYY HH:mm A z');
        date.locale(config.locale);
        condition.date = date;

        const sunrise = moment(data.query.results.channel.astronomy.sunrise, 'h:mm a');
        sunrise.locale(config.locale);

        const sunset = moment(data.query.results.channel.astronomy.sunset, 'h:mm a');
        sunset.locale(config.locale);

        return resolve({
          location: location,
          condition: condition,
          forecast: forecast,
          sunrise: sunrise,
          sunset: sunset
        });
      });
    });
  }
}

module.exports = YahooWeather;
