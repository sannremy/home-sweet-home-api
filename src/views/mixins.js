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
}

module.exports = Mixins;
