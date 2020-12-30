import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
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
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
