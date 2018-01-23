import * as types from '../constants/action-types';
import initialState from './initial-state';

export default function (state = initialState.user, action) {
  switch (action.type) {
    case types.LOGIN_USER:
      return action.data;

    case types.LOGOUT_USER:
      return initialState.user;

    case types.GET_PROFILE:
      return {...state, ...action.user}
      
    case types.UPDATE_PROFILE:
      return {...state, ...action.user}

    default:
      return state;
  }
}
