//this file will serve as the combineReducers file.

import { combineReducers } from 'redux';
import usersReducer from './users';

const appReducer = combineReducers({
  users: usersReducer,
});

export default appReducer;
