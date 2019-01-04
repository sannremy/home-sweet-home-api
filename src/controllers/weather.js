'use strict';

// Libs
const openWeatherMap = require('../libs/open-weather-map');

// Model
const Weather = require('../models/weather');

class WeatherController {
  static async indexHandler(req, res, next) {
    let openWeatherMapData = await openWeatherMap.getWeather();

    res.json(openWeatherMapData);

    return next();
  }
}

module.exports = WeatherController;
