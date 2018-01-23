import * as types from '../constants/action-types';
import { SERVER_URL, END_POINTS } from '../constants/api';
import { API } from '../helpers';

// GET MESSAGES
export function getMessagesSuccess(messages) {
  return {
    type: types.GET_MESSAGES_SUCCESS,
    messages: messages
  };
}

export function getMessages() {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.MESSAGES}`
    })
    .then((response) => {
      dispatch(getMessagesSuccess(response.data.messages));
      return response
    })
  }
}

// SEND MESSAGE
export function sendMessageSuccess(message) {
  return {
    type: types.SEND_MESSAGE_SUCCESS,
    message: message
  }
}

export function sendMessage(message) {
  return function (dispatch) {
    return API.fetch({
      method: 'post',
      url: `${SERVER_URL}${END_POINTS.MESSAGES}`,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: message
    })
    .then((response) => {
      dispatch(sendMessageSuccess(response.data));
      return response
    })
  }
}
