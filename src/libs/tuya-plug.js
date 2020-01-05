const config = require('config');
const TuyaWebAPI = require('homebridge-tuya-web/lib/tuyawebapi');

const tuyaApi = new TuyaWebAPI(
  config.tuya.username,
  config.tuya.password,
  config.tuya.countryCode
);

class TuyaPlug {
  static async getDevices() {
    try {
      if (!tuyaApi.session.hasValidToken()) {
        await tuyaApi.getOrRefreshToken();
      }

      const devices = await tuyaApi.discoverDevices();
      return devices;
    } catch (err) {
      console.error(err);
    }

    return [];
  }

  static async switchPlug(name, enable) {
    try {
      const devices = await TuyaPlug.getDevices();

      const plug = devices.find(device => {
        return device.name.toLowerCase() === name.toLowerCase();
      });

      if (plug) {
        const payload = {
          value: enable ? 1 : 0
        };

        await tuyaApi.setDeviceState(plug.id, 'turnOnOff', payload);

        plug.data.state = payload.state;

        return plug;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  }
}

module.exports = TuyaPlug;
