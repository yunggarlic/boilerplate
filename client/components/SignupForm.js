import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../redux/users';

const SignupForm = (props) => {
  const { handleSubmit } = props;
  return (
    <div>
      <h2>Sign up!</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="email"></input>
        <input type="text" name="password" placeholder="password"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault();
      const thunk = signup({
        email: evt.target.email.value,
        password: evt.target.password.value,
      });
      await dispatch(thunk);
      ownProps.history.push('/');
    },
  };
};

export default connect(null, mapDispatch)(SignupForm);
