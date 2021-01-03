import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/users';

const UserLogin = (props) => {
  const { handleSubmit } = props;
  return (
    <div>
      <h1>Log In</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="email" />
          <input type="text" name="password" placeholder="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault();
      const thunk = login({
        email: evt.target.email.value,
        password: evt.target.password.value,
      });
      await dispatch(thunk);
      ownProps.history.push('/home');
    },
  };
};

export default connect(null, mapDispatch)(UserLogin);
