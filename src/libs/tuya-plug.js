const config = require('config');
const TuyaWebAPI = require('homebridge-tuya-web/lib/tuyawebapi');

const tuyaApi = new TuyaWebAPI(
  config.tuya.username,
  config.tuya.password,
  config.tuya.countryCode
);

class TuyaPlug {
  static async getDevices() {
    await tuyaApi.getOrRefreshToken();
    const devices = await tuyaApi.discoverDevices();

    console.log(devices);
  }
}

module.exports = TuyaPlug;
