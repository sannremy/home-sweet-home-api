'use strict';

const http = require('http');
const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../libs/asyncMiddleware');
const NetgearRouter = require('../libs/netgear-router');

router.get('/', asyncMiddleware(async (req, res, next) => {

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
}));

module.exports = router;
