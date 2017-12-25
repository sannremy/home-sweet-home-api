((global) => {
  const io = require('socket.io-client')();
  global.socket = io.connect('http://127.0.0.1:8080');
})(window);
