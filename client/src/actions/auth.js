import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from "actions/types/auth";
import { setAlert } from "actions/alert";
import { setAuthToken } from "utils";

export const register = ({ name, email, password }) => async dispatch => {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ name, email, password });

    const res = await axios.post('/api/users', body, options)

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: REGISTER_FAIL });
    dispatch(loadUser());
  }
}

export const loadUser = () => async dispatch => {
  try {
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.get('/api/auth');

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch(err) {
    dispatch({ type: AUTH_ERROR });
  }
}

export const login = ({ email, password }) => async dispatch => {
  try {
    const body = JSON.stringify({ email, password });
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/auth/login', body, options);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: LOGIN_ERROR });
  }
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
}
