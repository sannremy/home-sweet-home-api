'use strict';

// Libs
const tuyaPlug = require('../libs/tuya-plug');

class TuyaController {
  static async indexHandler(req, res, next) {
    let devices = await tuyaPlug.getDevices();

    res.json({
      devices
    });

    return next();
  }

  static async switchHandler(req, res, next) {
    const name = req.params.name;
    const enable = !!parseInt(req.params.enable);

    const plug = await tuyaPlug.switchPlug(name, enable);

    res.json({
      plug
    });

    return next();
  }
}

module.exports = TuyaController;
