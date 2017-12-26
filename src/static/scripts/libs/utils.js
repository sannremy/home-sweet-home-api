const io = require('socket.io-client')();
const socket = io.connect('http://localhost:8080');

class Utils {
  static addServiceListener(serviceName, callback) {
    return socket.on(serviceName, callback);
  }
}

module.exports = Utils;
