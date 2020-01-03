const hmacSHA256 = require('crypto-js/hmac-sha256');
const config = require('config');
const axios = require('axios');

class TuyaPlug {
  static async getToken() {
    const url = 'https://openapi.tuyaeu.com/v1.0/token?grant_type=1';
    const t = new Date().getTime();

    const sign_method = 'HMAC-SHA256';

    const sign = hmacSHA256(config.tuya.clientId + t, config.tuya.clientSecret).toString().toUpperCase();

    let response = await axios.get(url, {
      headers: {
        client_id: config.tuya.clientId,
        sign_method,
        sign,
        t,
      }
    });

    const data = response.data;
    return data.result.access_token;
  }
}

module.exports = TuyaPlug;
