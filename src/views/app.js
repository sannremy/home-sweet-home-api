import React from 'react';
import DefaultLayout from './layouts/default';
import Weather from './components/weather';
import WaterLevel from './components/water-level';
import Traffic from './components/traffic';
import IndoorMetric from './components/indoor-metric';
import ConnectedDevice from './components/connected-device';

class App extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <div className="container-fluid">
          <div className="row py-2">
            <div className="col-sm">
              <Weather />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-sm">
              <Traffic />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-sm">
              <WaterLevel />
            </div>
            <div className="col-sm">
              <IndoorMetric />
            </div>
            <div className="col-sm">
              <ConnectedDevice />
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = App;
