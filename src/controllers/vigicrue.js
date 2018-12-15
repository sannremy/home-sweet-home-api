'use strict';

// Libs
const Vigicrue = require('../libs/vigicrue');

class VigicrueController {
  static async get(req, res, next) {
    let data = await Vigicrue.getWaterLevel();
    res.json(data);
  }
}

module.exports = VigicrueController;
