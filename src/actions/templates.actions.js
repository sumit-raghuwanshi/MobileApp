import * as types from '../constants/action-types';
import { SERVER_URL, END_POINTS } from '../constants/api';
import { API } from '../helpers';

// GET MESSAGES
export function getTemplatesSuccess(templates) {
  return {
    type: types.GET_TEMPLATES,
    templates
  };
}

export function getTemplates() {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.TEMPLATES}`
    })
    .then((response) => {
      dispatch(getTemplatesSuccess(response.data.templates));
      return response
    })
  }
}
