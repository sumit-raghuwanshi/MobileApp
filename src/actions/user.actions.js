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

export function getUserList(user) {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${USERS}`,
      data: user,
      headers: {
        'Content-Type': 'application/json',
        'ACCESS_TOKEN': '72d2d63c293fa2fba53627dea33b3311'
      },
    })
    .then((response) => {
      return dispatch(getUserListSuccess(response.data));
    })
  };
}
