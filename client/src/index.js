// external imports
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// local imports
import App from './App';
import rootReducer from './reducers'

// assets
import './index.css';

const store = configureStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

