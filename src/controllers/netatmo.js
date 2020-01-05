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

  static async changeScheduleHandler(req, res, next) {
    const name = req.params.name;
    let result = await netatmo.changeSchedule(name);
    res.json({
      status: result ? 'ok' : 'error'
    });

    return next();
  }
}

module.exports = NetatmoController;
