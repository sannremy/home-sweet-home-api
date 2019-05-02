'use strict';

// Libs
const Transilien = require('../libs/transilien');

class TrainsController {
  static async indexHandler(req, res, next) {
    let data = await Transilien.getNextDepartures();
    res.json(data);

    return next();
  }
}

module.exports = TrainsController;
