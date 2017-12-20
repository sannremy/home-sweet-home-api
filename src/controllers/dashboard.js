'use strict';

const moment = require('moment');

const config = require('../configs/home-sweet-home');

class DashboardController {
  static async indexHandler(req, res, next) {
    let date = moment();
    date.locale(config.locale);

    res.render('index', {
      date: date
    });
  }
}

module.exports = DashboardController;
