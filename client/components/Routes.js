import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserPage from './UserPage';
import UserLogin from './UserLogin';
import { fetchMe } from '../redux/users';

class Routes extends React.Component {
  componentDidMount() {
    this.props.fetchMe();
  }

  render() {
    if (this.props.userCurrentlyBeingFetched) {
      return <h1>Loading</h1>;
    }
    return (
      <Router>
        <Switch>
          <Route path="/home" component={UserPage} />
          <Route path="/" component={UserLogin} />
        </Switch>
      </Router>
    );
  }
}

const mapState = (state) => ({
  userCurrentlyBeingFetched: state.user.isFetching,
});

const mapDispatch = (dispatch) => ({
  fetchMe: () => dispatch(fetchMe()),
});

export default connect(mapState, mapDispatch)(Routes);
