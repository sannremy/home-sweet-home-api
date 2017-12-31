const config = require('../configs/home-sweet-home');

const axios = require('axios');

class Vigicrue {
  static async getWaterLevel() {
    let info = await Vigicrue.getWaterLevelDate();
    info.color = await Vigicrue.getAttentionColor();

    return info;
  }

  static async getWaterLevelDate() {
    return new Promise((resolve, reject) => {
      axios
        .get(config.vigicrue.levelUrl)
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

  static async getAttentionColor() {
    return new Promise((resolve, reject) => {
      axios
        .get(config.vigicrue.attentionUrl)
        .then((response) => {
          const data = response.data;
          let color = null;

          if(data.indexOf('Vert') > -1) {
            color = 'green';
          }
          else if (data.indexOf('Rouge') > -1) {
            color = 'red';
          }
          else if (data.indexOf('Orange') > -1) {
            color = 'orange';
          }
          else if (data.indexOf('Jaune') > -1) {
            color = 'yellow';
          }

          resolve(color);
        });
    });
  }
}

module.exports = Vigicrue;
