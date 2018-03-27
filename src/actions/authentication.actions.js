import axios from 'axios';
import * as types from '../constants/action-types';
import { SERVER_URL, LOGIN, END_POINTS } from '../constants/api';
import { API } from '../helpers';
import { AsyncStorage } from 'react-native';

// LOGIN_USER
export function loginSuccess(res) {
  return {
    type: types.LOGIN_USER,
    data: res.data
  };
}

export function loginUser(user) {
  return function (dispatch) {
    return API.fetch({
      method: 'post',
      url: `${SERVER_URL}${LOGIN}`,
      data: user
    })
    .then(res => {
      AsyncStorage.setItem('currentUser', JSON.stringify(res.data));
      return dispatch(loginSuccess(res));
    })
  };
}

// Update Profile
export function updateProfileSuccess(user) {
  return {
    type: types.UPDATE_PROFILE,
    user
  };
}

export function updateProfile(user) {
  return function(dispatch) {
    return API.fetch({
      method: 'patch',
      url: `${SERVER_URL}${END_POINTS.PROFILE}`,
      data: user,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      dispatch(updateProfileSuccess(response.data))
      return response
    })
  }
}

// Get Profile
export function getProfileSuccess(user) {
  return {
    type: types.GET_PROFILE,
    user
  };
}

export function getProfile() {
  return function(dispatch, getState) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.USERS}/${getState().user.id}`
    })
    .then((response) => {
      dispatch(getProfileSuccess(response.data))
      return response
    })
  }
}

//Forgot Password
export function forgotPasswordSuccess(user) {
  return {
    type: types.FORGOT_PASSWORD_SUCCESS,
    user
  };
}

export function forgotPasswordRequest() {
  return {
    type: types.FORGOT_PASSWORD_REQUEST,
  };
}
export function forgotPasswordError() {
  console.log("Errors")
  return {
    type: types.FORGOT_PASSWORD_ERROR,
  };
}
export function forgotPasswordAction(data) {
  console.log("Button clicked--->" + JSON.stringify(data))
  return function (dispatch) {
    return API.fetch({
      method: 'post',
      url: `${SERVER_URL}${END_POINTS.FORGOT_PASSWORD}`,
      data: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        dispatch(forgotPasswordSuccess(response.data))
        return response
      })
  }
}
