import * as types from '../constants/action-types';
import initialState from './initial-state';

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER:
      return action.data;

    default:
      return state;
  }
}
