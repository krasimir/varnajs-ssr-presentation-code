import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createStore from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={ createStore() }>
    <App />
  </Provider>,
  document.querySelector('#container')
)