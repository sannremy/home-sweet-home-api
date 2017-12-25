class Utils {
  static addServiceListener(serviceName, callback) {
    global.socket.on(serviceName, function (data) {
      callback(data);
    });
  }
}

module.exports = Utils;
