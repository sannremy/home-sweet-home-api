const moment = require('moment');

class Mixins {
  static getLocaleTimeString(dateStr, format) {
    return dateStr ? moment(dateStr, format).format('LT') : '';
  }

  static getLocaleDateString(dateStr, format) {
    return dateStr ? moment(dateStr, format).format('LL') : '';
  }
}

module.exports = Mixins;
