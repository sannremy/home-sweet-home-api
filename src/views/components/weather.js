import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(nextProps) {
    const Utils = require('../../static/scripts/libs/utils');

    Utils.addServiceListener('weather', (data) => {
      console.log('socket', data);
      this.setState(data);
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextprops', nextProps);
  }

  render() {
    return (
      <div className="weather">
        <WeatherSunrise sunrise="test" />
      </div>
    );
  }
}

module.exports = Weather;

class WeatherSunrise extends React.Component {
  render() {
    return (
      <div className="weather__sunrise">
        <div>{this.props.sunrise}</div>
      </div>
    );
  }
}
