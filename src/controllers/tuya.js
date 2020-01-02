'use strict';

// Libs
const tuyaPlug = require('../libs/tuya-plug');

class TuyaController {
  static async indexHandler(req, res, next) {
    let devices = await tuyaPlug.getDevices();

    res.json({
      devices: devices
    });

    return next();
  }
}

module.exports = TuyaController;
