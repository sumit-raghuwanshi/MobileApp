import * as types from '../constants/action-types';
import initialState from './initial-state';
import _ from 'lodash';

export default function (state = initialState.jobs, action) {
  switch (action.type) {
    case types.GET_JOBS_SUCCESS:
      return action.jobs;

    case types.GET_CUSTOMER_JOBS_SUCCESS:
      return action.jobs

    case types.UPDATE_JOB:
      return _.map(state, (job) => job.id == action.job.id ? action.job : job)

    case types.LOGOUT_USER:
      return initialState.jobs;

    case types.LOGOUT_USER:
      return initialState.jobs;

    case types.MAKE_PAYMENT_SUCCESS:
      return action.data;

    case types.GET_ALL_EVENT_SUCCESS:
      return action.data
    case types.GET_JOB_PAYMENTS_SUCCESS:
      return action.data
    default:
      return state;
  }
}
