import React from 'react';
import { connect } from 'react-redux';

import { usersFetched } from './redux/actions';
import { getUsers } from './redux/selectors';

async function fetchUsers() {
  const response = await fetch('http://localhost:9000/users.json');

  return response.json();
}

class App extends React.Component {
  
  async componentWillMount() {
    if (this.props.users === null) {
      this.props.usersFetched(await fetchUsers());
    }
  }
  render() {
    const { users } = this.props;

    if (users) {
      return <p>There are { users.length } users</p>;
    }
    return <p>Loading</p>;
  }
}

export default connect(
  state => ({
    users: getUsers(state)
  }),
  dispatch => ({
    usersFetched: data => dispatch(usersFetched(data))
  })
)(App);

