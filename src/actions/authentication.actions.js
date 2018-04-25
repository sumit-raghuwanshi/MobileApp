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
      // console.log("Data ---->"+JSON.stringify(res))
      AsyncStorage.setItem('currentUser', JSON.stringify(res.data));
     dispatch(loginSuccess(res));
     return res
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
      //console.log("Heelooo "+JSON.stringify(response))
      dispatch(getProfileSuccess(response))
      //return response
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
        //return response
      })
  }
}

//Update Current location
export function updateCurrentLocationSuccess(user) {
  return {
    type: types.UPDATE_CURRENT_LOCATION_SUCCESS,
    user
  };
}

export function updateCurrentLocationRequest() {
  return {
    type: types.UPDATE_CURRENT_LOCATION_REQUEST,
  };
}
export function updateCurrentLocationError() {
  console.log("Errors")
  return {
    type: types.UPDATE_CURRENT_LOCATION_ERROR,
  };
}
export function updateCurrentLocationAction(data) {
  //console.log("Button clicked--->" + JSON.stringify(data) +SERVER_URL+"--"+END_POINTS.UPDATE_CURRENT_LOCATION)
  return function (dispatch) {
    return API.fetch({
      method: 'post',
      url: `${SERVER_URL}${END_POINTS.UPDATE_CURRENT_LOCATION}`,
      data: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        //console.log("RRRRRRRRR "+JSON.stringify(response))
        dispatch(updateCurrentLocationSuccess(response))
        //return response
      })
  }
}
