const config = require('../configs/home-sweet-home');
const moment = require('moment');
const axios = require('axios');

class Netatmo {
  constructor() {
    this.access_token = null;
  }

  async getAccessToken() {
    axios({
      'method': 'post',
      'url': 'https://api.netatmo.com/oauth2/token',
      'data': {
        'grant_type': 'password',
        'client_id': config.netatmo.clientId,
        'client_secret': config.netatmo.clientIdSecret,
        'username': config.netatmo.username,
        'password': config.netatmo.password,
        'scope': 'read_station'
      }
    }).then(response => {
      console.log(response);
      let access_token = response;
      return access_token;
    }).catch(err => {
      console.log(err);
    });
  }

  async getIndoorMetrics() {
    if (this.access_token === null) {
      let access_token = await this.getAccessToken();
      console.log(access_token);
    }
  }
}

module.exports = Netatmo;
