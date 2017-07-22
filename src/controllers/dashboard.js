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

  let soapReq = http.request(options, function(soapRes) {
    soapRes.setEncoding('utf8');
    if(soapRes.statusCode === 200) {
      let data = '';
      soapRes.on('data', function (chunk) {
        data += chunk;
      });

      soapRes.on('end', () => {
        let dataString = data.substring(
          data.indexOf('<NewAttachDevice>') + '<NewAttachDevice>'.length,
          data.indexOf('</NewAttachDevice>')
        );

        let dataSplit = dataString.split('@');
        let numberOfDevices = dataSplit[0];
        console.log('Number of devices: ' + numberOfDevices);
        for(let deviceString of dataSplit) {
          let deviceSplit = deviceString.split(';');
          console.log(deviceSplit);
        }
      });
    }
  });

  soapReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  soapReq.end();

  res.send('Hello World!');
});

module.exports = router;
