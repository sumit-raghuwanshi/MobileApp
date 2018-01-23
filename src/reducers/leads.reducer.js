import * as types from '../constants/action-types';
import initialState from './initial-state';

export default function (state = initialState.leads, action) {
  switch (action.type) {
    case types.CREATE_LEAD_SUCCESS:
      return [action.lead, ...state];

    default:
      return state;
  }
}
