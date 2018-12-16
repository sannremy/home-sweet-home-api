const querystring = require('querystring');
const config = require('config');
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
      // 'username': config.netatmo.username,
      // 'password': config.netatmo.password,
      'scope': 'read_station'
    })).then(response => {
      if (response.data && response.data.access_token) {
        return response.data.access_token;
      } else {
        throw new Error('No token');
      }
    }).catch(err => {
      throw err;
    });
  }

  async getIndoorMetrics() {
    if (this.access_token === null) {
      this.access_token = await this.getAccessToken();
    }

    return axios.post(this.api + 'api/getstationsdata', {
      access_token: this.access_token
    }).then(response => {
      let mainModules = [];
      let additionalModules = [];
      let rainModules = [];
      let outdoorModules = [];

      let mainModule = response.data.body.devices[0];

      mainModules.push({
        module_name: mainModule.module_name,
        dashboard_data: mainModule.dashboard_data,
      });

      response.data.body.devices[0].modules.forEach(module => {
        let moduleObj = {
          module_name: module.module_name,
          dashboard_data: module.dashboard_data,
        };

        if (module.type === 'NAModule4') { // additional modules
          additionalModules.push(moduleObj);
        } else if (module.type === 'NAModule3') { // Rain module
          rainModules.push(moduleObj);
        } else if (module.type === 'NAModule1') { // Outdoor module
          outdoorModules.push(moduleObj);
        }
      });

      return {
        main: mainModules,
        additional: additionalModules,
        rain: rainModules,
        outdoor: outdoorModules,
      };
    });
  }
}

module.exports = Netatmo;
