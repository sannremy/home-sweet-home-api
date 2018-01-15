import moment from 'moment';

class Mixins {
  static moment(arg1, arg2) {
    return moment(arg1, arg2);
  }

  static getLocaleDateString(dateStr, format) {
    return dateStr ? moment(dateStr,).format(format) : '';
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

    return dateStr ? moment(dateStr, inputFormat).calendar() : '';
  }

  static getDurationFromGoogleMaps(durationStr) {
    return moment.duration(durationStr).humanize();
  }
}

export default Mixins;
