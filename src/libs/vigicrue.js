const config = require('../configs/home-sweet-home');

const axios = require('axios');

class Vigicrue {
  static async getWaterLevel() {
    return new Promise((resolve, reject) => {
      axios
        .get(config.vigicrue.url)
        .then((response) => {
          const data = response.data;
          const lastData = data.Serie.ObssHydro[data.Serie.ObssHydro.length - 1];
          resolve({
            date: new Date(lastData[0]),
            level: lastData[1]
          });
        });
    });
  }
}

module.exports = Vigicrue;
