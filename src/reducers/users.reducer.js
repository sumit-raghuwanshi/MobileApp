import * as types from '../constants/action-types';
import initialState from './initial-state';

export default function (state = initialState.users, action) {
  switch (action.type) {
    case types.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        ...action.users
      };

    case types.GET_PARTICULAR_USER_SUCCESS:
      return {
      	...state,
      	...action.users
      }

    case types.SEND_MESSAGE_SUCCESS:
     return {
     	...state,
     	...action
     }
    default:
      return state;
  }
}
