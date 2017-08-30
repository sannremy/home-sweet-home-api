'use strict';

const config = require('../configs/home-sweet-home');
const NetgearRouter = require('../libs/netgear-router');

class WifiController {
  static async onlineDevicesHandler(req, res, next) {
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
  }
}

module.exports = WifiController;
