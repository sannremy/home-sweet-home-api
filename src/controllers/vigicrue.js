'use strict';

// Libs
const VigicrueData = require('../libs/vigicrue-data');

// Model
const Vigicrue = require('../models/Vigicrue');

class VigicrueController {
  static async indexHandler(req, res, next) {
    let current = await VigicrueData.getCurrent();
    let vigicrue = new Vigicrue(current.name, current.date, current.level, current.color);

    res.json(vigicrue);

    return next();
  }
}

module.exports = VigicrueController;
