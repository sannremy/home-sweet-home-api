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

    if (Object.keys(Control.getModes()).includes(mode)) {
      mode = Control.startMode(mode);
    }

    res.json({
      mode
    })
  }
}

module.exports = ControlController;
