'use strict';

const config = require('../configs/home-sweet-home');

// Libs
const YahooWeather = require('../libs/yahoo-weather');
const GoogleMaps = require('../libs/google-maps');
const Vigicrue = require('../libs/vigicrue');
const WemoSwitchInsight = require('../libs/wemo-switch-insight');
const NetgearRouter = require('../libs/netgear-router');
const Netatmo = require('../libs/netatmo');

// Instances
const netatmo = new Netatmo();

class ServiceController {
  static async getConnectedDevices(req, res, next) {
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

  static async getTraffic(req, res, next)  {
    let data = await GoogleMaps.getDurations();
    res.json(data);
  }

  static async getWeather(req, res, next) {
    let data = await YahooWeather.getWeather();
    res.json(data);
  }

  static async getWaterLevel(req, res, next) {
    let data = await Vigicrue.getWaterLevel();
    res.json(data);
  }

  static async getIndoorMetrics(req, res, next) {
    let data = await netatmo.getIndoorMetrics();
    res.json(data);
  }
}

module.exports = ServiceController;
