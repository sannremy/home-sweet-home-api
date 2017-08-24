'use strict';

const express = require('express');
const routes = require('./configs/routes');

const app = express();

const PORT = 8080;
const HOST = '127.0.0.1';

for(let route in routes) {
  app.use(route, require('./routes' + routes[route]));
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
