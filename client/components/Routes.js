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
import { fetchMe } from '../redux/users';

class Routes extends React.Component {
  async componentDidMount() {
    console.log('before Fetch --> ', this.props.user);
    await this.props.fetchMe();
    console.log('after fetch --> ', this.props.user);
  }

  render() {
    if (this.props.userCurrentlyBeingFetched) {
      return <h1>Loading</h1>;
    }
    return (
      <Switch>
        <Route path="/home" component={UserPage} />
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
