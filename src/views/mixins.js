const moment = require('moment');

class Mixins {
  static getLocaleTimeString(dateStr, format) {
    return dateStr ? moment(dateStr, format).format('LT') : null;
  }

  static getLocaleDateString(dateStr, format) {
    return dateStr ? moment(dateStr, format).format('LL') : null;
  }

  static getLocaleCalendarString(dateStr, format) {
    moment.updateLocale('en', {
        calendar : {
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            nextDay : '[Tomorrow]',
            lastWeek : '[Last] dddd',
            nextWeek : 'dddd',
            sameElse : 'L'
        }
    });

    return dateStr ? moment(dateStr, format).calendar() : null;
  }

  static getDurationFromGoogleMaps(durationStr) {
    // PT23M23S
    let regex = new RegExp('/PT([0-9]+H)?([0-9]+M)?([0-9]+S)?/', 'g');
    durationStr.match(regex);
  }
}

module.exports = Mixins;
