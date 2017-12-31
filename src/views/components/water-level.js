import React from 'react';
import BaseComponent from './base';
import Mixins from '../mixins';

/**
 * Water Level component (main)
 */
class WaterLevel extends BaseComponent {
  constructor(props) {
    super(props);
    this.serviceName = 'water_level';
  }

  render() {
    return (
      <div className={'water-level' + (this.state.isLoading ? ' water-level--is-loading' : '')}>
        <div>Level: {this.state.level}</div>
        <div>Date: {Mixins.getLocaleTimeString(this.state.date)}</div>
      </div>
    );
  }
}

module.exports = WaterLevel;
