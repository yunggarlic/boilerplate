//this file will serve as the combineReducers file.

import { combineReducers } from 'redux';
import usersReducer from './users';

const appReducer = combineReducers({
  //NOTE - because we're declaring user here, it sets user to state. If you were to declare user in usersReducer and in the combine reducer, you'd have to access that state as state.user.user
  user: usersReducer,
});

export default appReducer;
