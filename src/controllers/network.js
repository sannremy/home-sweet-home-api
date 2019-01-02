'use strict';

const config = require('config');

// Libs
const NetgearRouter = require('../libs/netgear-router');

class NetworkController {
  static async indexHandler(req, res, next) {
    let netgearRouter = new NetgearRouter();
    let isLogged = await netgearRouter.login(
      null,
      config.netgear.username,
      config.netgear.password
    );

    let attachedDevices = null;
    if (isLogged) {
      attachedDevices = await netgearRouter.getAttachedDevices(null);
    }

    res.json(attachedDevices);

    return next();
  }
}

module.exports = NetworkController;
