'use strict';

const moment = require('moment');

const config = require('../configs/home-sweet-home');

const YahooWeather = require('../libs/yahoo-weather');
const GoogleMaps = require('../libs/google-maps');
const Vigicrue = require('../libs/vigicrue');

class DashboardController {
  static async indexHandler(req, res, next) {
    let date = moment();
    date.locale(config.locale);

    let weather = await YahooWeather.getWeather();
    let trafficDurations = await GoogleMaps.getDurations();
    let waterLevel = await Vigicrue.getWaterLevel();

    res.render('pages/dashboard/index', {
      weather: weather,
      trafficDurations: trafficDurations,
      waterLevel: waterLevel,
      date: date
    });
  }
}

module.exports = DashboardController;
