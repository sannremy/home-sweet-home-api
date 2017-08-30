const express = require('express');
const router = express.Router();
const asyncController = require('../libs/async-controller');

const DashboardController = require('../controllers/dashboard');

router.get('/', asyncController(DashboardController.indexHandler));

module.exports = router;
