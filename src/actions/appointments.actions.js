import * as types from '../constants/action-types';
import { SERVER_URL, END_POINTS } from '../constants/api';
import { API } from '../helpers';

// GET APPOINTMENTS
export function getAppointmentsSuccess(appointments) {
  return {
    type: types.GET_APPOINTMENTS_SUCCESS,
    appointments
  };
}

export function getAppointments() {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.APPOINTMENTS}`
    })
    .then((response) => {
      dispatch(getAppointmentsSuccess(response.data.calendars));
      return response
    })
  }
}

// CREATE APPOINTMENT
export function createAppointmentSuccess(appointment) {
  return {
    type: types.CREATE_APPOINTMENT_SUCCESS,
    appointment
  };
}

export function createAppointment(appointment) {
  return function (dispatch) {
    return API.fetch({
      method: 'post',
      url: `${SERVER_URL}${END_POINTS.APPOINTMENTS}`,
      data: appointment
    })
    .then((response) => {
      dispatch(createAppointmentSuccess(response.data));
      return response
    })
  }
}
