const React = require('react');

class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{this.props.value}</div>
    );
  }
}

module.exports = Weather;
