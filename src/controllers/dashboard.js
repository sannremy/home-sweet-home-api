'use strict';

const YahooWeather = require('../libs/yahoo-weather');

class DashboardController {
  static async indexHandler(req, res, next) {
    let weather = await YahooWeather.getWeather();
    res.render('pages/dashboard/index', {
      weather: weather
    });
  }
}

module.exports = DashboardController;
