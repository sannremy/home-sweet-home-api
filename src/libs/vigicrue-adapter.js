const config = require('../configs/home-sweet-home');

const axios = require('axios');

class VigicrueAdapter {
  static async getCurrent() {
    const info = await Vigicrue.getCurrentLevel();
    const color = await Vigicrue.getAttentionColor();

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
    });
  }
}

module.exports = VigicrueAdapter;
