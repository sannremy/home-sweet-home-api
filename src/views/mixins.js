const moment = require('moment');

class Mixins {
  static getLocaleDateString(dateStr, format) {
    return dateStr ? moment(dateStr).format(format) : null;
  }

  static getLocaleCalendarString(dateStr, inputFormat) {
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

    return dateStr ? moment(dateStr, inputFormat).calendar() : null;
  }

  static getDurationFromGoogleMaps(durationStr) {
    return moment.duration(durationStr).humanize();
  }
}

module.exports = Mixins;
