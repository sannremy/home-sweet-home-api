import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const Utils = require('../../static/scripts/libs/utils');
    Utils.addServiceListener('weather', (data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <div className="weather">
        <WeatherDate date="32/32/2323" />
      </div>
    );
  }
}

module.exports = Weather;

class WeatherDate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="weather__date">
        <div>{this.props.date}</div>
      </div>
    );
  }
}
