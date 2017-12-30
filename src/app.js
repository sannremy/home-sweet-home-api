'use strict';

require('dotenv').config();
const path = require('path');
const axios = require('axios');
const http = require('http');
const express = require('express');
const reactViews = require('express-react-views');
const expressCfg = require('./configs/express');
const routesCfg = require('./configs/routes');

const app = express();

for(let key in expressCfg) {
  app.set(key, expressCfg[key]);
}

app.engine('js', reactViews.createEngine());

app.use('/static', express.static(path.join(process.cwd(), 'dist', 'static')));

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';

for(let route in routesCfg) {
  app.use(route, require('./routes' + routesCfg[route]));
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

const server = http.createServer(app);
const io = require('socket.io')(server);
server.listen(PORT);

io.on('connection', (socket) => {
  console.log('Client connected.');

  axios
    .get('http://' + HOST + ':' + PORT + '/service/weather')
    .then((response) => {
      socket.emit('weather', response.data);
    });

  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
});
