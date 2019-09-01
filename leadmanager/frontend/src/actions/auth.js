import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from './types';
import axios from 'axios';
import { returnErrors } from './messages';

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({
    type: USER_LOADING
  });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(response => {
      dispatch({
        type: USER_LOADED,
        payload: response
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// log in user
export const loginUser = (username, password) => dispatch => {
  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // request body
  const body = JSON.stringify({ username, password });

  axios
    .post('/api/auth/login', body, config)
    .then(response => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// log out user
export const logoutUser = () => (dispatch, getState) => {
  axios
    .post('/api/auth/logout', null, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// setup config with config - helper function
export const tokenConfig = getState => {
  // get token from state
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // check for the token - if token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
