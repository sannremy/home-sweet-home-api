const config = require('../configs/home-sweet-home');

const moment = require('moment');
const Wemo = require('wemo-client');

class WemoSwitchInsight {
  static async getInfo() {
    return new Promise((resolve, reject) => {
      let wemo = new Wemo();
      wemo.discover((err, device) => {
        if (device.deviceType === Wemo.DEVICE_TYPE.Insight) {
          console.log('Wemo Insight Switch found: %s', device.friendlyName);

          let client = wemo.client(device);
          client.on('insightParams', function(state, power) {
            console.log('%s’s power consumption: %s W',
              device.friendlyName,
              state,
              Math.round(power / 1000)
            );

            return resolve({
              state: state,
              power: power
            });
          });
        }
      });
    });
  }
}

module.exports = WemoSwitchInsight;
