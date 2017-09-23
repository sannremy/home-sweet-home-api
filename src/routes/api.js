const express = require('express');
const router = express.Router();
const asyncController = require('../libs/async-controller');

const YahooWeather = require('../libs/yahoo-weather');
const GoogleMaps = require('../libs/google-maps');
const Vigicrue = require('../libs/vigicrue');
const WemoSwitchInsight = require('../libs/wemo-switch-insight');
const NetgearRouter = require('../libs/netgear-router');


router.get('/weather', asyncController(async (req, res, next) => {
  let data = await YahooWeather.getWeather();
  res.json(data);
}));

router.get('/traffic', asyncController(async (req, res, next) => {
  let data = await GoogleMaps.getDurations();
  res.json(data);
}));

module.exports = router;
