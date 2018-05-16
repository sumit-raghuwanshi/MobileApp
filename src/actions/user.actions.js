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
      //debugger;
      console.log("getting users :" , response.data)
      return dispatch(getUserListSuccess(response.data));
    })
  };
}
