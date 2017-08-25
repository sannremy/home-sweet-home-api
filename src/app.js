'use strict';

const express = require('express');
const expressCfg = require('./configs/express');
const routesCfg = require('./configs/routes');

const app = express();

for(let key in expressCfg) {
  app.set(key, expressCfg[key]);
}

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';

for(let route in routesCfg) {
  app.use(route, require('./routes' + routesCfg[route]));
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
