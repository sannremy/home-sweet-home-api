const React = require('react');

class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  	window.socket.on(serviceName, function (data) {
  	  this.props.date = data.date;
  	  this.props.level = data.level;
  	});
  }

  render() {
    return (
      <div className="water-level">
      	<div>{this.props.date.toLocaleTimeString()}</div>
      	<div>{this.props.level}</div>
      </div>
    );
  }
}

module.exports = Weather;
