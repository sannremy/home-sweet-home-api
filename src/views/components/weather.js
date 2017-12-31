import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentDidMount(nextProps) {
    const Utils = require('../../static/scripts/libs/utils');

    Utils.addServiceListener('weather', (data) => {
      console.log('socket', data);
      this.setState(data);
    });
  }

  render() {
    return (
      <div className="weather">
        <WeatherSunrise sunrise={this.state.sunrise} />
      </div>
    );
  }
}

module.exports = Weather;

class WeatherSunrise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sunrise: `${props.sunrise}`
    };
  }

  render() {
    const localeDate = (date) => date ? (new Date(date)).toLocaleDateString() : '';

    return (
      <div className="weather__sunrise">
        <div>{localeDate(this.props.sunrise)}</div>
      </div>
    );
  }
}
