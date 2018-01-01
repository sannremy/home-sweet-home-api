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
        <_WeatherSunrise date={this.state.sunrise} />
        <_WeatherSunset date={this.state.sunset} />
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
