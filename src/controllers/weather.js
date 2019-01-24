'use strict';

// Libs
const openWeatherMap = require('../libs/open-weather-map');

// Model
const Weather = require('../models/Weather');

class WeatherController {
  static async indexHandler(req, res, next) {
    let openWeatherMapForecastData = await openWeatherMap.getWeather('/forecast/daily');
    let openWeatherMapCurrentData = await openWeatherMap.getWeather('/weather');

    res.json({
      current: openWeatherMapCurrentData,
      forecast: openWeatherMapForecastData
    });

    return next();
  }
}

module.exports = WeatherController;
