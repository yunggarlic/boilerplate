import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const UserPage = (props) => {
  const { user, handleClick } = props;

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
      const thunk = logout();
      await dispatch(thunk);
      ownProps.history.push('/');
    },
  };
};

export default connect(mapState, mapDispatch)(UserPage);
