import React from 'react';
import BaseComponent from './base';
import Mixins from '../mixins';

/**
 * Weather component (main)
 */
class Weather extends BaseComponent {
  constructor(props) {
    super(props);
    this.serviceName = 'weather';
  }

  render() {
    const classNames = ['weather'];

    if (this.state.isLoading) {
      classNames.push('weather--is-loading');
    }

    return (
      <div className={classNames.join(' ')}>
        <_WeatherTemperature temperature={this.state.temperature} />
        <_WeatherSunrise date={this.state.sunrise} />
        <_WeatherSunset date={this.state.sunset} />
        <_WeatherForecast forecast={this.state.forecast} />
      </div>
    );
  }
}

module.exports = Weather;

/**
 * Weather Sunrise component
 */
class _WeatherSunrise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: `${props.date}`
    };
  }

  render() {
    return (
      <div className="weather__sunrise">
        <div>{'Sunrise: ' + Mixins.getLocaleTimeString(this.props.date)}</div>
      </div>
    );
  }
}

/**
 * Weather Sunset component
 */
class _WeatherSunset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: `${props.date}`
    };
  }

  render() {
    return (
      <div className="weather__sunset">
        <div>{'Sunset: ' + Mixins.getLocaleTimeString(this.props.date)}</div>
      </div>
    );
  }
}

/**
 * Weather Temperature component
 */
class _WeatherTemperature extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: `${props.temperature}`
    };
  }

  render() {
    return (
      <div className="weather__temperature">
        <div>{this.props.temperature + '°C'}</div>
      </div>
    );
  }
}

/**
 * Weather Forecast component
 */
class _WeatherForecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: `${props.forecast}`
    };
  }

  render() {
    let daysList = [];

    if (this.props.forecast && this.props.forecast.length) {
      daysList = this.props.forecast.map((day) => {
        return  <li key={day.date}>
                  <div>{day.date}</div>
                  <div>{day.code}</div>
                  <div>{day.date}</div>
                  <div>{day.day}</div>
                  <div>{day.high}</div>
                  <div>{day.low}</div>
                  <div>{day.text}</div>
                </li>;
      });
    }

    return (
      <div className="weather__forecast">
        {daysList.length > 0 &&
          <ul>{daysList}</ul>
        }
      </div>
    );
  }
}
