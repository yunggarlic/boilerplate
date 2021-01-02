import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserSignup from './UserSignup';

const Routes = () => {
  return (
    <Router>
      <div>
        <Route
          path="/"
          render={() => (
            <div>
              <h1>Hello world</h1>
              <form>
                <input type="text" />
              </form>
            </div>
          )}
        />
        <Route path="/signup" component={UserSignup} />
      </div>
    </Router>
  );
};

export default Routes;
