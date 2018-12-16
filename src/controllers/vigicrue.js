'use strict';

// Libs
const VigicrueAdapter = require('../libs/vigicrue-adapter');

// Model
const Vigicrue = require('../models/vigicrue');

class VigicrueController {
  static async indexHandler(req, res, next) {
    let current = await VigicrueAdapter.getCurrent();
    let vigicrue = new Vigicrue(current.date, current.level, current.color);

    res.json(vigicrue);

    return next();
  }
}

module.exports = VigicrueController;
