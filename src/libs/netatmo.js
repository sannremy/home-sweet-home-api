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
      let modules = [];

      let mainModule = response.data.body.devices[0];

      modules.push({
        module_name: mainModule.module_name,
        dashboard_data: mainModule.dashboard_data,
        type: 'main'
      });

      response.data.body.devices[0].modules.forEach(module => {
        modules.push({
          module_name: module.module_name,
          dashboard_data: module.dashboard_data,
          type: 'additional'
        });
      });

      return {
        modules: modules
      };
    });
  }
}

module.exports = Netatmo;
