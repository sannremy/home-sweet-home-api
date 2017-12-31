import React from 'react';
import Mixins from '../mixins';

/**
 * Weather component (main)
 */
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  componentDidMount(nextProps) {
    const Utils = require('../../static/scripts/libs/utils');

    Utils.addServiceListener('weather', (data) => {
      data.isLoading = false;
      this.setState(data);
    });
  }

  render() {
    return (
      <div className={'weather' + (this.state.isLoading ? ' is-loading' : '')}>
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
