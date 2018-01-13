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
            <div data-toggle="tooltip" data-placement="bottom" title={device.ip_addr}>
              <_ConnectedDeviceTypeIcon type={device.reference ? device.reference.type : null} />
              <span>{device.reference ? device.reference.label : "unknown"}</span>
            </div>
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

class _ConnectedDeviceTypeIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let icon = '';

    switch(this.props.type) {
      case 'pc':
        icon = 'desktop';
      break;
      case 'smartphone':
        icon = 'mobile';
      break;
      case 'tablet':
        icon = 'tablet';
      break;
      case 'console':
        icon = 'gamepad';
      break;
      case 'other':
        icon = 'microchip';
      break;
      case 'guest':
        icon = 'user';
      break;
      default:
        icon = 'question-circle';
      break;
    }

    const classNames = ['fa', 'fa-' + icon, 'connected-device-icon'];

    return <i className={classNames.join(' ')} />;
  }
}
