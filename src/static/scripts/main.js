import React from 'react';
import ReactDOM from 'react-dom';

import App from '../../views/app';

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.hydrate(<App />, document);
});
