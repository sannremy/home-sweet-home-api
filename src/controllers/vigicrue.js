'use strict';

// Libs
const Vigicrue = require('../libs/vigicrue-adapter');

class VigicrueController {
  static async indexHandler(req, res, next) {
    let vigicrue = await Vigicrue.getCurrent();
    res.json(vigicrue);

    return next();
  }
}

module.exports = VigicrueController;
