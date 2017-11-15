import axios from 'axios';
import * as types from '../constants/action-types';
import { SERVER_URL, LOGIN } from '../constants/api';
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
    return axios({
      method: 'post',
      url: `${SERVER_URL}${LOGIN}`,
      data: user,
      headers: {
        'Content-Type': 'application/json',
        ACCESS_TOKEN: '72d2d63c293fa2fba53627dea33b3311'
      },
    })
    .then(res => {
      AsyncStorage.setItem('currentUser', JSON.stringify(res.data));
      return dispatch(loginSuccess(res));
    })
  };
}
