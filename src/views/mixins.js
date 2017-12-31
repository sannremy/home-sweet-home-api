class Mixins {
  static getLocaleTimeString(date) {
    return date ? (new Date(date)).toLocaleTimeString() : '';
  }
}

module.exports = Mixins;
