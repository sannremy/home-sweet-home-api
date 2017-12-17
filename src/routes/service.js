const express = require('express');
const router = express.Router();
const asyncController = require('../libs/async-controller');
const ServiceController = require('../controllers/service');

router.get('/weather', asyncController(ServiceController.getWeather));

router.get('/traffic', asyncController(ServiceController.getTraffic));

router.get('/connected_devices', asyncController(ServiceController.getConnectedDevices));

module.exports = router;
