import * as types from '../constants/action-types';
import initialState from './initial-state';

export default function (state = initialState.templates, action) {
  switch (action.type) {
    case types.GET_TEMPLATES:
      return action.templates;

    case types.LOGOUT_USER:
      return initialState.templates;

    default:
      return state;
  }
}
