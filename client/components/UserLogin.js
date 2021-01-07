import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/users';
import OauthLoginForm from './OauthLoginForm';

const UserLogin = (props) => {
  const { handleSubmit } = props;
  return (
    <div>
      <h1>Log In</h1>
      <button type="button" onClick={() => props.history.push('/signup')}>
        Sign up!
      </button>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="email" />
          <input type="text" name="password" placeholder="password" />
          <button type="submit">Submit</button>
        </form>
        <OauthLoginForm />
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
