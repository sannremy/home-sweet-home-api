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
    const classNames = ['water-level'];

    if (this.state.isLoading) {
      classNames.push('water-level--is-loading');
    }

    if (this.state.color) {
      classNames.push('water-level--' + this.state.color);
    }

    return (
      <div className={classNames.join(' ')}>
        <div>Level: {this.state.level}</div>
        <div>Date: {Mixins.getLocaleDateString(this.state.date)}</div>
      </div>
    );
  }
}

module.exports = WaterLevel;
