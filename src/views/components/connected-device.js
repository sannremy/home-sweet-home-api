import React from 'react';
import BaseComponent from './base';
import Mixins from '../mixins';

/**
 * Connected device component (main)
 */
class ConnectedDevice extends BaseComponent {
  constructor(props) {
    super(props);
    this.serviceName = 'connected_devices';
  }

  render() {
    const classNames = ['connected-device'];

    if (this.state.isLoading) {
      classNames.push('connected-device--is-loading');
    }

    let devicesList = [];

    this.state.devices.map(module => {
      return (
        <div key={module.module_name}>
          <span>{module.module_name}</span>:
          <_IndoorMetricCO2 value={module.dashboard_data.CO2} />
        </div>
      );
    });

    return (
      <div className={classNames.join(' ')}>
        {devicesList.length > 0 &&
          <div>
            {devicesList}
          </div>
        }
      </div>
    );
  }
}

module.exports = ConnectedDevice;
