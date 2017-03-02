import { createStore, combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import login from './login';

export default combineReducers({
  login,
  form,
});
