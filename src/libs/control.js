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

  static startMode(name) {
    if (!config.control.modes[name]) {
      return null;
    }

    const mode = config.control.modes[name];
    for (let i = 0; i < mode.urls.length; i++) {
      console.log('GET ', mode.urls[i]);
      // axios.get(mode.urls[i]);
    }

    return mode;
  }
}

module.exports = Control;
