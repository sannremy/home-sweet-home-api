'use strict';

// Libs
const Control = require('../libs/control');

class ControlController {
  static async indexHandler(req, res, next) {
    let modes = await Control.getModes(true);

    res.json({
      modes
    });

    return next();
  }

  static startModeHandler(req, res, next) {
    let mode = req.params.mode;
    const host = req.header('Host');

    if (Object.keys(Control.getModes()).includes(mode)) {
      mode = Control.startMode(host, mode);
    }

    res.json({
      mode
    })
  }
}

module.exports = ControlController;
