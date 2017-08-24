const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../libs/asyncMiddleware');

const DashboardController = require('../controllers/dashboard');

router.get('/', asyncMiddleware(DashboardController.indexHandler));

module.exports = router;
