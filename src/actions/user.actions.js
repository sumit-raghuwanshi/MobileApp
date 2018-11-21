import axios from 'axios';
import * as types from '../constants/action-types';
import { SERVER_URL, USERS } from '../constants/api';
import { API } from '../helpers';
import { AsyncStorage } from 'react-native';

// USER LIST
export function getUserListSuccess(data) {
  return {
    type: types.GET_USER_LIST_SUCCESS,
    users: data.users
  };
}

export function getUserList() {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${USERS}`
    })
    .then((response) => {
      
      console.log("getting users :" , response.data)
      return dispatch(getUserListSuccess(response.data));
    })
  };
}



export function getCustomerUserListSuccess(data) {
  return {
    type: types.GET_CUSTOMER_USER_LIST_SUCCESS,
    users: data.users
  };
}



export function getCustomerUserList() {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}`
    })
    .then((response) => {
      
      console.log("getting users :" , response.data)
      return dispatch(getCustomerUserListSuccess(response.data));
    })
  };
}



export function getParticularUserSuccess(data) {
  return {
    type: types.GET_PARTICULAR_USER_SUCCESS,
    users: data
  };
}



export function getParticularUser(user_id,job) {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}/api/v1/users/${user_id}/get_user?job_id=${job.id}`
    })
    .then((response) => {

      console.log("getting user :" , response.data)
      return dispatch(getParticularUserSuccess(response.data));
    })
  };
}



// export function sendMessageSuccess(data) {
//   return {
//     type: types.SEND_TEXT_MESSAGE_SUCCESS,
//     users: data
//   };
// }


// export function sendMessageAction(user_id) {
//   return function (dispatch) {
//     return API.fetch({
//       method: 'get',
//       url: `${SERVER_URL}/api/v1/users/${user_id}/get_user`
//     })
//     .then((response) => {

//       console.log("getting user :" , response.data)
//       return dispatch(sendMessageSuccess(response.data));
//     })
//   };
// }