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


export function getJobPaymentsSuccess(invoices) {
  return {
    type: types.GET_JOB_PAYMENTS_SUCCESS,
    invoices
  };
}



export function getJobPayments(id) {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.JOBS}/${id}/get_invoices`
    })
    .then((response) => {
      // dispatch(getJobPaymentsSuccess(response.data.invoices));
      return response.data.invoices
    })
  }
}



export function getCustomerJobsSuccess(jobs) {
  return {
    type: types.GET_CUSTOMER_JOBS_SUCCESS,
    jobs
  };
}





export function getCustomerJobs() {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.CUSTOMER_JOBS}`
    })
    .then((response) => {
      dispatch(getCustomerJobsSuccess(response.data.jobs));
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
export function getAllMeasurements(job_id) {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.JOBS}/${job_id}/measurements`,
    })
      .then((response) => {
        //dispatch(updateLeadSuccess(response.data));
        return response
      })
  }
}

export function updateJobStatus(id , data) {
  return function(dispatch) {
    return API.fetch({
      method: 'post',
      url: `${SERVER_URL}${END_POINTS.JOBS}/${id}/edit_status`,
      data : data
    })
    .then((response) => {
      //dispatch(updateLeadSuccess(response.data));
      return response
    })
  }
}


export function getParticularInvoice(id,estimate_id) {
  return function(dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.JOBS}/${id}/estimates/${estimate_id}/get_invoice`,
    })
    .then((response) => {
      //dispatch(updateLeadSuccess(response.data));
      return response
    })
  }
}




//make payment for by customer

export function makePaymentSuccess(data) {
  return {
    type: types.MAKE_PAYMENT_SUCCESS,
    data
  };
}

export function makePaymentAction(invoice,token) {
  return function (dispatch) {
    return API.fetch({
      method: 'post',
      url: `${SERVER_URL}api/v1/jobs/${invoice.job_id.$oid}/estimates/${invoice.estimate_id.$oid}/payment`,
      data: {token: token, invoice_id: invoice._id.$oid}
    })
    .then((response) => {
      dispatch(makePaymentSuccess(response.data));
      return response.data
    })
  }
}


export function getAllEventSuccess(data) {
  return {
    type: types.GET_ALL_EVENT_SUCCESS,
    data
  };
}

export function getAllEventAction(){
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}api/v1/company_locations/appointments`,
    })
    .then((response) => {
      dispatch(getAllEventSuccess(response.data));
      return response.data
    })
  }
}






