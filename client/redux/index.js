//this file will serve as the combineReducers file.

import { combineReducers } from 'redux';
import usersReducer from './users';

const appReducer = combineReducers({
  user: usersReducer,
});

export default appReducer;
