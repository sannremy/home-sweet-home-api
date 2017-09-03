const config = require('../configs/home-sweet-home');

const moment = require('moment');
const https = require('https');
const cheerio = require('cheerio');

class Vigicrue {
  static async getWaterLevel() {
    return new Promise((resolve, reject) => {
      const req = https.get(config.vigicrue.url, (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const $ = cheerio.load(data);
          let date = moment($('.liste tr:nth-child(2) td:nth-child(1)').text(), 'DD/MM/YYYY HH:mm');
          date.locale(config.locale);

          let level = $('.liste tr:nth-child(2) td:nth-child(2)').text();
          let waterLevel = {
            date: date,
            level: level
          }
          resolve(waterLevel);
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.end();
    });
  }
}

module.exports = Vigicrue;
