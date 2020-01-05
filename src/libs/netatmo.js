const querystring = require('querystring');
const config = require('config');
const axios = require('axios');

class Netatmo {
  constructor() {
    this.access_token = null;
    this.refresh_token = null;
    this.token_expires_at = null;

    this.api = config.netatmo.apiUrl;
  }

  async checkToken() {
    if (this.token_expires_at === null || this.token_expires_at <= new Date()) {
      let token = await this.getToken();

      if (token) {
        const date = new Date();
        this.token_expires_at = date.setSeconds(date.getSeconds() + token.expires_in);
        this.access_token = token.access_token;
        this.refresh_token = token.refresh_token;

        return true;
      }
    }

    return (this.token_expires_at !== null && this.token_expires_at > new Date());
  }

  async getToken() {
    let token = null;
    if (this.token_expires_at === null) {
      token = await this.getAccessToken();
    } else {
      token = await this.getRefreshToken();
    }

    return token;
  }

  async getAccessToken() {
    try {
      let response = await axios.post(this.api + '/oauth2/token', querystring.stringify({
        'grant_type': 'password',
        'client_id': config.netatmo.clientId,
        'client_secret': config.netatmo.clientSecret,
        'username': config.netatmo.username,
        'password': config.netatmo.password,
        'scope': 'read_station read_thermostat write_thermostat'
      }))

      if (response.data && response.data.access_token) {
        return {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          expires_in: response.data.expires_in
        };
      } else {
        throw new Error('No access token found');
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getRefreshToken() {
    try {
      let response = await axios.post(this.api + '/oauth2/token', querystring.stringify({
        'grant_type': 'refresh_token',
        'client_id': config.netatmo.clientId,
        'client_secret': config.netatmo.clientSecret,
        'refresh_token': this.refresh_token
      }));

      if (response.data && response.data.access_token) {
        return {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          expires_in: response.data.expires_in
        };
      } else {
        throw new Error('No access token found');
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getIndoorMetrics() {
    try {
      await this.checkToken();

      let response = await axios.post(this.api + '/api/getstationsdata', {
        access_token: this.access_token
      });

      let mainModules = [];
      let additionalModules = [];
      let rainModules = [];
      let outdoorModules = [];

      let mainModule = response.data.body.devices[0];

      mainModules.push({
        module_name: mainModule.module_name,
        dashboard_data: mainModule.dashboard_data,
        battery_percent: 100, // Plugged
        reachable: mainModule.reachable,
      });

      response.data.body.devices[0].modules.forEach(module => {
        let moduleObj = {
          module_name: module.module_name,
          dashboard_data: module.dashboard_data,
          battery_percent: module.battery_percent,
          reachable: module.reachable,
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
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async changeSchedule(scheduleName) {
    try {
      await this.checkToken();

      let response = await axios.get(this.api + '/api/homesdata', {
        headers: {
          Authorization: 'Bearer ' + this.access_token
        }
      });

      // Home
      const home = response.data.body.homes[0];

      // Get schedule
      const schedule = home.therm_schedules.find(schedule => {
        return schedule.name.toLowerCase() === scheduleName.toLowerCase();
      });

      if (schedule) {
        response = await axios.get(this.api + '/api/switchhomeschedule?schedule_id=' + schedule.id + '&home_id=' + home.id, {
          headers: {
            Authorization: 'Bearer ' + this.access_token
          }
        });

        return response.data.status === 'ok';
      }
    } catch (err) {
      console.error(err.response.data);
    }

    return false;
  }
}

module.exports = Netatmo;
