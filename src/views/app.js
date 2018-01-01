import React from 'react';
import DefaultLayout from './layouts/default';
import Weather from './components/weather';
import WaterLevel from './components/water-level';

class App extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <div className="container">
          <div className="row py-2">
            <div className="col-sm">
              <Weather />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-sm">
              Traffic
            </div>
          </div>
          <div className="row py-2">
            <div className="col-sm">
              <WaterLevel />
            </div>
            <div className="col-sm">
              idk
            </div>
            <div className="col-sm">
              Devices
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = App;
