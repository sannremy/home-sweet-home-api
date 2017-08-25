'use strict';

const NetgearRouter = require('../libs/netgear-router');

class WifiController {
  static async onlineDevicesHandler(req, res, next) {
    let netgearRouter = new NetgearRouter();
    let isLogged = await netgearRouter.login(
      null,
      process.env.NETGEAR_USERNAME,
      process.env.NETGEAR_PASSWORD
    );

    let attachedDevices = null;
    if (isLogged) {
      attachedDevices = await netgearRouter.getAttachedDevices(null);
    }

    res.json(attachedDevices);
  }
}

module.exports = WifiController;
