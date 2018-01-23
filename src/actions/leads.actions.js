import * as types from '../constants/action-types';
import { SERVER_URL, END_POINTS } from '../constants/api';
import { API } from '../helpers';
import { AsyncStorage } from 'react-native';

// CREATE LEAD
export function createLeadSuccess(lead) {
  return {
    type: types.CREATE_LEAD_SUCCESS,
    lead
  };
}

export function createLead(lead) {
  return function (dispatch) {
    return API.fetch({
      method: 'post',
      url: `${SERVER_URL}${END_POINTS.LEADS}`,
      data: lead,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      dispatch(createLeadSuccess(res.data));
      return res
    })
  };
}
