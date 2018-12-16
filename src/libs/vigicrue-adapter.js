const config = require('config');
const axios = require('axios');

const Vigicrue = require('../models/Vigicrue');

class VigicrueAdapter {
  static async getCurrent() {
    const info = await VigicrueAdapter.getCurrentLevel();
    const color = await VigicrueAdapter.getAttentionColor();

    return new Vigicrue(info.date, info.level, color);
  }

  static async getCurrentLevel() {
    return axios
      .get(config.vigicrue.levelUrl)
      .then((response) => {
        const data = response.data;
        const lastData = data.Serie.ObssHydro[data.Serie.ObssHydro.length - 1];
        return {
          date: new Date(lastData[0]),
          level: lastData[1]
        };
    });
  }

  static async getAttentionColor() {
    return axios
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

        return color;
    });
  }
}

module.exports = VigicrueAdapter;
