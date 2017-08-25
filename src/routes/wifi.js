const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../libs/asyncMiddleware');

const WifiController = require('../controllers/wifi');

router.get('/', asyncMiddleware(WifiController.onlineDevicesHandler));

module.exports = router;
