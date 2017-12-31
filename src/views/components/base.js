import React from 'react';

/**
 * Base component
 */
class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.serviceName = null;
  }

  componentDidMount() {
    if (this.serviceName) {
      const Utils = require('../../static/scripts/libs/utils');

      Utils.addServiceListener(this.serviceName, (data) => {
        console.log(data);
        data.isLoading = false;
        this.setState(data);
      });
    }
  }
}

module.exports = BaseComponent;
