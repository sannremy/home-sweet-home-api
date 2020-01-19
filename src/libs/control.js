const config = require('config');
const axios = require('axios');

class Control {
  static getModes(asArray = false) {
    if (asArray) {
      return Object.values(config.control.modes);
    } else {
      return config.control.modes;
    }
  }

  static async startMode(host, name) {
    if (!config.control.modes[name]) {
      return null;
    }

    const mode = config.control.modes[name];

    try {
      for (let i = 0; i < mode.urls.length; i++) {
        await axios.get(`http://${host}${mode.urls[i]}`);
      }
    } catch (err) {
      console.error(err);
    }

    return mode;
  }
}

module.exports = Control;
