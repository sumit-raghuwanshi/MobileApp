import * as types from '../constants/action-types';
import { SERVER_URL, END_POINTS } from '../constants/api';
import { API } from '../helpers';

// GET MESSAGES
export function getJobsSuccess(jobs) {
  return {
    type: types.GET_JOBS_SUCCESS,
    jobs
  };
}

export function getJobs() {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.JOBS}`
    })
    .then((response) => {
      dispatch(getJobsSuccess(response.data.jobs));
      return response
    })
  }
}

//UPDATE JOB

export function updateJobSuccess(job) {
  return {
    type: types.UPDATE_JOB,
    job
  }
}

export function updateJob(id, job) {
  return function(dispatch) {
    return API.fetch({
      method: 'patch',
      url: `${SERVER_URL}${END_POINTS.JOBS}/${id}`,
      data: job
    })
    .then((response) => {
      dispatch(updateJobSuccess(response.data));
      return response
    })
  }
}


export function getParticularJob(id) {
  return function(dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.JOBS}/${id}`,
    })
    .then((response) => {
      //dispatch(updateLeadSuccess(response.data));
      return response
    })
  }
}