import * as types from '../constants/action-types';
import initialState from './initial-state';
import _ from 'lodash';

export default function (state = initialState.tasks, action) {
  switch (action.type) {
    case types.CREATE_TASKS_SUCCESS:
      return [...state, action.task];

    case types.DELETE_TASKS_SUCCESS:
      return _.filter([...state], (task) => task.id != action.id);

    case types.GET_TASKS_SUCCESS:
      return action.tasks;

    case types.UPDATE_TASK_SUCCESS:
      return _.map([...state], (task) => task.id == action.task.id ? action.task : task)

    case types.LOGOUT_USER:
      return initialState.tasks;

    default:
      return state;
  }
}
