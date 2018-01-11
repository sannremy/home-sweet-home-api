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

    if (this.state.devices && this.state.devices.length) {
      devicesList = this.state.devices.map(device => {
        return (
          <div key={device.mac_addr}>
            <span>{device.name}</span>
          </div>
        );
      });
    }

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
