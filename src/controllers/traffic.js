'use strict';

// Libs
const GoogleMaps = require('../libs/google-maps');

class TrafficController {
  static async indexHandler(req, res, next) {
    let data = await GoogleMaps.getDurations();
    res.json(data);

    return next();
  }
}

module.exports = TrafficController;
