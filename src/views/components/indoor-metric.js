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

    let indoorList = [];

    let moduleComponent = (module) => {
      return (
        <div key={module.module_name}>
          <span>{module.module_name}</span>:
          <_IndoorMetricCO2 value={module.dashboard_data.CO2} />
        </div>
      );
    };

    if (this.state.main && this.state.main.length) {
      indoorList = indoorList.concat(this.state.main.map(moduleComponent));
    }

    if (this.state.additional && this.state.additional.length) {
      indoorList = indoorList.concat(this.state.additional.map(moduleComponent));
    }

    return (
      <div className={classNames.join(' ')}>
        {indoorList.length > 0 &&
          <div>
            {indoorList}
          </div>
        }
      </div>
    );
  }
}

module.exports = IndoorMetric;

/**
 * Indoor metric CO2 component
 */
class _IndoorMetricCO2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="indoor-metric-co2">
        {this.props.value} ppm
      </div>
    );
  }
}
