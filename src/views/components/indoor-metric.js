import React from 'react';
import BaseComponent from './base';
import Mixins from '../mixins';

/**
 * Indoor metric component
 */
class IndoorMetric extends BaseComponent {
  constructor(props) {
    super(props);
    this.serviceName = 'indoor_metrics';
  }

  render() {
    const classNames = ['indoor-metric'];

    if (this.state.isLoading) {
      classNames.push('indoor-metric--is-loading');
    }

    return (
      <div className={classNames.join(' ')}>
      test
      </div>
    );
  }
}

module.exports = IndoorMetric;
