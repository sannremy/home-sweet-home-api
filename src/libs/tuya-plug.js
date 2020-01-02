const crypto = require('crypto');
const config = require('config');
const axios = require('axios');

class TuyaPlug {
  static async getDevices() {
    const url = 'https://openapi.tuyaeu.com/v1.0/token?grant_type=1';
    const t = Date.now();

    const sign_method = 'HMAC-SHA256';
    const sign = crypto.createHmac('sha256', config.tuya.clientSecret)
      .update(config.tuya.clientId + t)
      .digest('base64').toUpperCase();

    let response = await axios.get(url, {
      headers: {
        sign_method,
        sign,
        t,
      }
    });
    console.log(url, response.data);
  }
}

module.exports = TuyaPlug;
