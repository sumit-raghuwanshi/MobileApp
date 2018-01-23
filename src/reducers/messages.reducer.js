import * as types from '../constants/action-types';
import initialState from './initial-state';

export default function (state = initialState.messages, action) {
  switch (action.type) {
    case types.GET_MESSAGES_SUCCESS:
      return action.messages;

    case types.LOGOUT_USER:
      return initialState.messages;

    case types.SEND_MESSAGE_SUCCESS:
      return [action.message, ...state];

    default:
      return state;
  }
}
