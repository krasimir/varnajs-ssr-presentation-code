'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static(__dirname + '/../../data'));
app.use(_express2.default.static(__dirname + '/../'));

app.get('*', function (req, res) {
  res.set('Content-type', 'text/html');
  res.send('<h1>Hello VarnaJS</h1>');
});

app.listen(9000, console.log('The server is running at port 9000'));