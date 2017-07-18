'use strict';

const express = require('express');
const routers = require('./configs/routers');

const app = express();

const PORT = 8080;
const HOST = '127.0.0.1';

for(let route in routers) {
  app.use(route, require('./controllers' + routers[route]));
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
