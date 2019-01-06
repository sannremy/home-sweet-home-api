const config = require('config');

const axios = require('axios');
const moment = require('moment');

class OpenWeatherMap {
  static async getWeather() {
    try {
      let response = await axios.get(config.openWeatherMap.apiUrl, {
        params: {
          q: config.openWeatherMap.city,
          units: 'metric',
          cnt: 5,
          appid: config.openWeatherMap.apiKey,
        }
      });

      const data = response.data;
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = OpenWeatherMap;
