import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import App from '../client/App';
import { Provider } from 'react-redux';
import createStore from '../client/redux/store';
import { getUsers } from '../client/redux/selectors';
import 'isomorphic-fetch';

const app = express();

app.use(express.static(__dirname + '/../../data'));
app.use(express.static(__dirname + '/../'));

function render(store) {
  return ReactDOMServer.renderToString(
    <Provider store={ store }>
      <App />
    </Provider>
  );
}

app.get('*', function (req, res) {
  const store = createStore();
  const unsubscribe = store.subscribe(() => {
    if (getUsers(store.getState()) !== null) {
      unsubscribe();
      res.set('Content-type', 'text/html');
      res.send(`
        <div id="container">${ render(store) }</div>
        <script>window.__APP_STATE = ${ JSON.stringify(store.getState()) }</script>
        <script src="bundle.js"></script>
      `);
    }
  });

  render(store);
});

app.listen(9000, console.log('The server is running at port 9000'));