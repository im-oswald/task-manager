import { combineReducers } from 'redux';
import authReducer from './auth';
import taskReducer from './task';
import alertReducer from './alert';

export default combineReducers({
  auth: authReducer,
  task: taskReducer,
  alert: alertReducer,
});
