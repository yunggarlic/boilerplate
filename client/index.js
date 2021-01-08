import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '../public/index.css';

import store from './store';
import Routes from './components/Routes';
import Navbar from './components/Navbar';

render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('app')
);
