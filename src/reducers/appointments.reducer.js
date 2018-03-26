import * as types from '../constants/action-types';
import initialState from './initial-state';
import _ from 'lodash';

export default function (state = initialState.appointments, action) {
  switch (action.type) {
    case types.CREATE_APPOINTMENT_SUCCESS:
      return [...state, action.appointment];

    case types.DELETE_APPOINTMENT_SUCCESS:
      return _.filter([...state], (appointment) => appointment.id != action.id);

    case types.GET_APPOINTMENTS_SUCCESS:
      return action.appointments;

    case types.UPDATE_APPOINTMENT_SUCCESS:
      return _.map([...state], (appointment) => appointment.id == action.appointment.id ? action.appointment : appointment)

    case types.LOGOUT_USER:
      return initialState.appointments;

    default:
      return state;
  }
}
