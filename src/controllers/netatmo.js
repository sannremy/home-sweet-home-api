'use strict';

// Libs
const Netatmo = require('../libs/netatmo');

// Instances
const netatmo = new Netatmo();

class NetatmoController {
  static async indexHandler(req, res, next) {
    let data = await netatmo.getIndoorMetrics();
    res.json(data);

    return next();
  }
}

module.exports = NetatmoController;
