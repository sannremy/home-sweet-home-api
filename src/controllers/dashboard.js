'use strict';

const NetgearRouter = require('../libs/netgear-router');

class DashboardController {
  static async indexHandler(req, res, next) {
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

    console.log(attachedDevices);

    res.send('Hello World!');
  }
}

module.exports = DashboardController;
