'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _App = require('../client/App');

var _App2 = _interopRequireDefault(_App);

var _reactRedux = require('react-redux');

var _store = require('../client/redux/store');

var _store2 = _interopRequireDefault(_store);

var _selectors = require('../client/redux/selectors');

require('isomorphic-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static(__dirname + '/../../data'));
app.use(_express2.default.static(__dirname + '/../'));

function render(store) {
  return _server2.default.renderToString(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, null)
  ));
}

app.get('*', function (req, res) {
  var store = (0, _store2.default)();
  var unsubscribe = store.subscribe(function () {
    if ((0, _selectors.getUsers)(store.getState()) !== null) {
      unsubscribe();
      res.set('Content-type', 'text/html');
      res.send('\n        <div id="container">' + render(store) + '</div>\n        <script>window.__APP_STATE = ' + JSON.stringify(store.getState()) + '</script>\n        <script src="bundle.js"></script>\n      ');
    }
  });

  render(store);
});

app.listen(9000, console.log('The server is running at port 9000'));