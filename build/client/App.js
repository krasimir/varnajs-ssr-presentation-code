'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('./redux/actions');

var _selectors = require('./redux/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

async function fetchUsers() {
  var response = await fetch('http://localhost:9000/users.json');

  return response.json();
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: async function componentWillMount() {
      if (this.props.users === null) {
        this.props.usersFetched((await fetchUsers()));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var users = this.props.users;


      if (users) {
        return _react2.default.createElement(
          'p',
          null,
          'There are ',
          users.length,
          ' users'
        );
      }
      return _react2.default.createElement(
        'p',
        null,
        'Loading'
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    users: (0, _selectors.getUsers)(state)
  };
}, function (dispatch) {
  return {
    usersFetched: function usersFetched(data) {
      return dispatch((0, _actions.usersFetched)(data));
    }
  };
})(App);