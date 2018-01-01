import React from 'react';

/**
 * Base component
 */
class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.serviceName = null;

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    if (this.serviceName) {
      const Utils = require('../../static/scripts/libs/utils');

      Utils.addServiceListener(this.serviceName, (data) => {
        console.log(data);

        data.isLoading = false;
        this.setState(data, () => {
          $('[data-toggle="tooltip"]').tooltip();
        });
      });
    }
  }
}

module.exports = BaseComponent;
