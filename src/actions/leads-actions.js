import * as types from '../constants/action-types';
import { SERVER_URL, END_POINTS } from '../constants/api';
import { API } from '../helpers';

// GET MESSAGES
export function getLeadsSuccess(leads) {
  // console.log("Heloooooo")
  return {
    type: types.GET_LEADS_SUCCESS,
    leads
    
  };
}

export function getLeads() {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.LEADS}`
    })
    .then((response) => {
      console.log("response leads" , response.data.leads)
      dispatch(getLeadsSuccess(response.data.leads));
      return response
    })
  }
}

//UPDATE LEAD

export function updateLeadSuccess(lead) {
  return {
    type: types.UPDATE_LEAD,
    lead
  }
}

export function updateLead(id, lead) {
  return function(dispatch) {
    return API.fetch({
      method: 'patch',
      url: `${SERVER_URL}${END_POINTS.LEADS}/${id}`,
      data: lead
    })
    .then((response) => {
      dispatch(updateLeadSuccess(response.data));
      return response
    })
  }
}

export function getParticularLead(id) {
  return function(dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.LEADS}/${id}`,
    })
    .then((response) => {
      //dispatch(updateLeadSuccess(response.data));
      return response
    })
  }
}

