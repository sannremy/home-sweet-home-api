'use strict';

const http = require('http');
const express = require('express');
const router = express.Router();

const NetgearRouter = require('../libs/netgear-router');

router.get('/', (req, res) => {

  let netgearRouter = new NetgearRouter();
  netgearRouter
    .login(null, process.env.NETGEAR_USERNAME, process.env.NETGEAR_PASSWORD)
    .then((isLogged) => {
      if (isLogged) {
        return netgearRouter.getAttachedDevices(null);
      } else {
        return null;
      }
    })
    .then((attachedDevices) => {
      console.log(attachedDevices);
    });

  res.send('Hello World!');
});

module.exports = router;
