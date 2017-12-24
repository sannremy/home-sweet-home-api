((global) => {
  const io = require('socket.io-client')();
  global.socket = io.connect('http://127.0.0.1:8080');

  // let listenService = (serviceName) => {
  //   socket.on(serviceName, function (data) {
  //     console.log(data);
  //     // socket.emit(serviceName + '-response', {
  //     //   msg: 'thanks'
  //     // });
  //   });
  // };

  // listenService('traffic');
  // listenService('weather');
  // listenService('connected_devices');
  // listenService('water_level');

})(window);
