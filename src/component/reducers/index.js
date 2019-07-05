import { combineReducers } from 'redux';
import authReducer from './authReducers';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  users: usersReducer
});