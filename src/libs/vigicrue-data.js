const config = require('config');
const axios = require('axios');

class VigicrueData {
  static async getCurrent() {
    try {
      const info = await VigicrueData.getCurrentLevel();
      const color = await VigicrueData.getAttentionColor();

      return {
        name: info.name,
        date: info.date,
        level: info.level,
        color: color
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async getCurrentLevel() {
    try {
      let response = await axios.get(config.vigicrue.levelUrl);

      // Get level and date
      let data = response.data;
      const lastData = data.Serie.ObssHydro[data.Serie.ObssHydro.length - 1];

      // Get river name
      let name = null;
      if (data.Serie.Link) {
        response = await axios.get(data.Serie.Link);
        data = response.data;
        name = data.LbCoursEau;
      }

      return {
        name: name,
        date: new Date(lastData[0]),
        level: lastData[1]
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async getAttentionColor() {
    try {
      let response = await axios.get(config.vigicrue.attentionUrl);

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
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = VigicrueData;
