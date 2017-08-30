const express = require('express');
const router = express.Router();
const asyncController = require('../libs/async-controller');

const WifiController = require('../controllers/wifi');

router.get('/', asyncController(WifiController.onlineDevicesHandler));

module.exports = router;
