import * as types from '../constants/action-types';
import { SERVER_URL, END_POINTS } from '../constants/api';
import { API } from '../helpers';

// GET MESSAGES
export function getEstimatesSuccess(estimates) {
  return {
    type: types.GET_ESTIMATES_SUCCESS,
    estimates
  };
}



export function getEstimates(job_id) {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}/api/v1/jobs/${job_id}/estimates`
    })
    .then((response) => {
      dispatch(getEstimatesSuccess(response.data.estimates));
      return response
    })
  }
}

export function getParticularEstimate(job_id,id) {
  return function(dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}/api/v1/jobs/${job_id}/estimates/${id}`,
    })
    .then((response) => {
      return response
    })
  }
}


export function updateEstimateStatusSuccess(estimate) {
  return {
    type: types.UPDATE_ESTIMATE_STATUS_SUCCESS,
    estimate
  }
}



export function updateEstimateStatus(job_id,id,val) {
  return function(dispatch) {
    return API.fetch({
      method: 'post',
      url: `${SERVER_URL}/api/v1/jobs/${job_id}/estimates/${id}/estimate_status`,
      data: {'status' : val},
    })
    .then((response) => {
      dispatch(updateEstimateStatusSuccess(response.data));
      return response
    })
  }
}

