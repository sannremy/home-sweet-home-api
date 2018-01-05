const querystring = require('querystring');
const config = require('../configs/home-sweet-home');
const moment = require('moment');
const axios = require('axios');

class Netatmo {
  constructor() {
    this.access_token = null;
    this.api = 'https://api.netatmo.com/';
  }

  async getAccessToken() {
    return axios.post(this.api + 'oauth2/token', querystring.stringify({
      'grant_type': 'password',
      'client_id': config.netatmo.clientId,
      'client_secret': config.netatmo.clientSecret,
      'username': config.netatmo.username,
      'password': config.netatmo.password,
      'scope': 'read_station'
    })).then(response => {
      if (response.data && response.data.access_token) {
        return response.data.access_token;
      } else {
        throw new Error('No token');
      }
    }).catch(err => {
      console.log(err);

      return null;
    });
  }

  async getIndoorMetrics() {
    if (this.access_token === null) {
      this.access_token = await this.getAccessToken();
    }

    return axios.post(this.api + 'api/getstationsdata', {
      access_token: this.access_token
    }).then(response => {
      // main
      console.log(response.data.body.devices[0]);
      // station_name
      // type
      // dashboard_data:
        // AbsolutePressure
        // time_utc
        // Noise
        // Temperature
        // temp_trend
        // Humidity
        // Pressure
        // pressure_trend
        // CO2
        // date_max_temp
        // date_min_temp
        // min_temp
        // max_temp
      // data_type
      // co2_calibrating
      // date_setup
      // last_setup
      // module_name
      // firmware
      // last_upgrade
      // wifi_status

      // modules
      console.log(response.data.body.devices[0]);
        // module.type
        // module.last_message
        // module.last_seen
        // module.dashboard_data
        // module.data_type
        // module.module_name
        // module.last_setup
        // module.battery_vp
        // module.battery_percent
        // module.rf_status
        // module.firmware
    });
  }
}

module.exports = Netatmo;
