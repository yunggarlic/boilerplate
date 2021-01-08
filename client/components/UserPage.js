import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../redux/users';

const UserPage = (props) => {
  const { user, handleClick } = props;
  if (!user.id) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div>
        <img src={user.imageUrl} />
        <h1>Welcome {user.email}!</h1>
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
      try {
        await dispatch(logout());
        ownProps.history.push('/');
      } catch (e) {
        ownProps.history.push('/signup');
      }
    },
  };
};

export default connect(mapState, mapDispatch)(UserPage);
