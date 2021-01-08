import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/users';

const Navbar = (props) => {
  const { handleClick, isLoggedIn } = props;
  return (
    <div className="navbar">
      <h1>My app</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: state.user.id ? true : false,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
