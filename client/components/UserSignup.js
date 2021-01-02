import React from 'react';
import { connect } from 'react-redux';
import { postUser } from '../redux/users';

const defaultState = {
  email: '',
  password: '',
};

class UserSignup extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postUser(this.state);

    event.target.reset(); //resets form
    this.setState(defaultState);
  };

  render() {
    return (
      <div>
        <h4>Sign up!</h4>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email" />
          <input
            type="text"
            name="email"
            placeholder="email"
            required={true}
            onChange={this.handleChange}
          />
          <label htmlFor="password" />
          <input
            type="text"
            name="password"
            placeholder="Password"
            required={true}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  postUser: (user) => {
    dispatch(postUser(user));
  },
});

export default connect(null, mapDispatch)(UserSignup);
