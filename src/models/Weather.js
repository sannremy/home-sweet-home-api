class Weather {
  constructor(location, condition, forecast, sunrise, sunset) {
    this.location = location;
    this.condition = condition;
    this.forecast = forecast;
    this.sunrise = sunrise;
    this.sunset = sunset;
  }
}

module.exports = Weather;
