import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';
import bootstrap from 'bootstrap/dist/js/bootstrap';

import App from '../../views/app';

// jQuery instance
window.jQuery = jquery;
window.$ = jquery;

// Hydrate React components from SSR
window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.hydrate(<App />, document);
});
