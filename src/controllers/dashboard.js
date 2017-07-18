'use strict';

const http = require('http');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  let options = {
    host: 'routerlogin.net',
    port: 5000,
    path: '/soap/server_sa/',
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': 'urn:NETGEAR-ROUTER:service:DeviceInfo:1#GetAttachDevice'
    }
  };

  var soapReq = http.request(options, function(soapRes) {
    soapRes.setEncoding('utf8');
    if(soapRes.statusCode === 200) {
      soapRes.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    }
  });

  soapReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  soapReq.write('data\n');
  soapReq.write('data\n');
  soapReq.end();

  res.send('Hello World!');
});

module.exports = router;
