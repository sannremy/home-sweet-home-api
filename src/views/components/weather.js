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
        <_WeatherCondition condition={this.state.condition} />
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
class _WeatherSunset extends BaseComponent {
  constructor(props) {
    super(props);
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
 * Weather current condition component
 */
class _WeatherCondition extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let condition = null;
    if (this.props.condition) {
      condition = (
        <div>
          <_WeatherIcon code={this.props.condition.code} />
          <div className="weather__condition__temperature">{this.props.condition.temp + '°C'}</div>
          <div>{this.props.condition.text}</div>
        </div>
      );
    }

    return (
      <div className="weather__condition">
        {condition}
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
  }

  render() {
    let daysList = [];

    if (this.props.forecast && this.props.forecast.length) {
      const Utils = require('../../static/scripts/libs/utils');

      daysList = this.props.forecast.map((day) => {
        return  (
          <li key={day.date}>
            <div>{Mixins.getLocaleDateString(day.date, 'DD MMM YYYY')}</div>
            <div>{day.code}</div>
            <div>{day.high}</div>
            <div>{day.low}</div>
            <div>{day.text}</div>
            <_WeatherIcon code={day.code} />
          </li>
        );
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

class _WeatherIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Gist: https://gist.github.com/Kepro/9ea2a918fd6f0a58b474
    // Icons from https://erikflowers.github.io/weather-icons/
    let icon = '';

    switch(this.props.code) {
      case '0':
        icon = 'tornado';
        break;
      case '1':
        icon = 'storm-showers';
        break;
      case '2':
        icon = 'tornado';
        break;
      case '3':
        icon = 'thunderstorm';
        break;
      case '4':
        icon = 'thunderstorm';
        break;
      case '5':
        icon = 'snow';
        break;
      case '6':
        icon = 'rain-mix';
        break;
      case '7':
        icon = 'rain-mix';
        break;
      case '8':
        icon = 'sprinkle';
        break;
      case '9':
        icon = 'sprinkle';
        break;
      case '10':
        icon = 'hail';
        break;
      case '11':
        icon = 'showers';
        break;
      case '12':
        icon = 'showers';
        break;
      case '13':
        icon = 'snow';
        break;
      case '14':
        icon = 'storm-showers';
        break;
      case '15':
        icon = 'snow';
        break;
      case '16':
        icon = 'snow';
        break;
      case '17':
        icon = 'hail';
        break;
      case '18':
        icon = 'hail';
        break;
      case '19':
        icon = 'cloudy-gusts';
        break;
      case '20':
        icon = 'fog';
        break;
      case '21':
        icon = 'fog';
        break;
      case '22':
        icon = 'fog';
        break;
      case '23':
        icon = 'cloudy-gusts';
        break;
      case '24':
        icon = 'cloudy-windy';
        break;
      case '25':
        icon = 'thermometer';
        break;
      case '26':
        icon = 'cloudy';
        break;
      case '27':
        icon = 'night-cloudy';
        break;
      case '28':
        icon = 'day-cloudy';
        break;
      case '29':
        icon = 'night-cloudy';
        break;
      case '30':
        icon = 'day-cloudy';
        break;
      case '31':
        icon = 'night-clear';
        break;
      case '32':
        icon = 'day-sunny';
        break;
      case '33':
        icon = 'night-clear';
        break;
      case '34':
        icon = 'day-sunny-overcast';
        break;
      case '35':
        icon = 'hail';
        break;
      case '36':
        icon = 'day-sunny';
        break;
      case '37':
        icon = 'thunderstorm';
        break;
      case '38':
        icon = 'thunderstorm';
        break;
      case '39':
        icon = 'thunderstorm';
        break;
      case '40':
        icon = 'storm-showers';
        break;
      case '41':
        icon = 'snow';
        break;
      case '42':
        icon = 'snow';
        break;
      case '43':
        icon = 'snow';
        break;
      case '44':
        icon = 'cloudy';
        break;
      case '45':
        icon = 'lightning';
        break;
      case '46':
        icon = 'snow';
        break;
      case '47':
        icon = 'thunderstorm';
        break;
      case '3200':
        icon = 'cloud';
        break;
      default:
        icon = 'cloud';
        break;
    }

    const classNames = ['wi', 'wi-' + icon];

    return <i className={classNames.join(' ')} />;
  }
}
