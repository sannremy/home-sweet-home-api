import React from 'react';
import BaseComponent from './base';
import Mixins from '../mixins';

/**
 * Traffic component (main)
 */
class Traffic extends BaseComponent {
  constructor(props) {
    super(props);
    this.serviceName = 'traffic';
  }

  render() {
    const classNames = ['traffic'];

    if (this.state.isLoading) {
      classNames.push('traffic--is-loading');
    }

    let durationList = [];

    if (this.state.durations && this.state.durations.length) {
      durationList = this.state.durations.map((duration) => {
        return  (
          <div key={duration.label}>
            <_TrafficItem duration={duration} />
          </div>
        );
      });
    }

    return (
      <div className={classNames.join(' ')}>
        {durationList.length > 0 &&
          <div>
            {durationList}
          </div>
        }
      </div>
    );
  }
}

module.exports = Traffic;

/**
 * Traffic Item component
 */
class _TrafficItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="traffic-item">
        {this.props.duration.label} : {Mixins.getDurationFromGoogleMaps(this.props.duration.duration)} ({this.props.duration.distance / 1000 + ' km'})
      </div>
    );
  }
}
