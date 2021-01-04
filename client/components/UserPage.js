import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../redux/users';

const UserPage = (props) => {
  const { user, handleClick } = props;
  console.log(user);
  if (!user.id) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div>
        <img src={user.imageUrl} />
        <h1>Welcome back {user.email}!</h1>
      </div>
      <div>
        <button onClick={handleClick}>Logout</button>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch, ownProps) => {
  return {
    async handleClick() {
      await dispatch(logout());
      ownProps.history.push('/');
    },
  };
};

export default connect(mapState, mapDispatch)(UserPage);
