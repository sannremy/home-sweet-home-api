'use strict';

// Libs
const YahooWeather = require('../libs/yahoo-weather');

// Model
const Weather = require('../models/weather');

class WeatherController {
  static async indexHandler(req, res, next) {
    let yahooWeather = await YahooWeather.getWeather();

    let weather = new Weather(
      yahooWeather.location,
      yahooWeather.condition,
      yahooWeather.forecast,
      yahooWeather.sunrise,
      yahooWeather.sunset
    );

    res.json(weather);

    return next();
  }
}

module.exports = WeatherController;
