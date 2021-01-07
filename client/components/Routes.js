import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import UserPage from './UserPage';
import UserLogin from './UserLogin';
import SignupForm from './SignupForm';
import { fetchMe } from '../redux/users';

class Routes extends React.Component {
  async componentDidMount() {
    await this.props.fetchMe();
  }

  render() {
    if (this.props.userCurrentlyBeingFetched) {
      return <h1>Loading</h1>;
    }
    return (
      <Switch>
        <Route path="/home" component={UserPage} />
        <Route component={SignupForm} />
        <Route component={UserLogin} />
      </Switch>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  userCurrentlyBeingFetched: state.user.isFetching,
});

const mapDispatch = (dispatch) => ({
  fetchMe: () => dispatch(fetchMe()),
});

export default withRouter(connect(mapState, mapDispatch)(Routes));
