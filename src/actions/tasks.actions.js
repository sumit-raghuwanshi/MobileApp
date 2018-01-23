import * as types from '../constants/action-types';
import { SERVER_URL, END_POINTS } from '../constants/api';
import { API } from '../helpers';

// GET TASKS
export function getTasksSuccess(tasks) {
  return {
    type: types.GET_TASKS_SUCCESS,
    tasks
  };
}

export function getTasks() {
  return function (dispatch) {
    return API.fetch({
      method: 'get',
      url: `${SERVER_URL}${END_POINTS.TASKS}`
    })
    .then((response) => {
      dispatch(getTasksSuccess(response.data.tasks));
      return response
    })
  }
}

// CREATE TASK
export function createTaskSuccess(task) {
  return {
    type: types.CREATE_TASKS_SUCCESS,
    task
  };
}

export function createTask(task) {
  return function (dispatch) {
    return API.fetch({
      method: 'post',
      url: `${SERVER_URL}${END_POINTS.TASKS}`,
      data: task
    })
    .then((response) => {
      dispatch(createTaskSuccess(response.data));
      return response
    })
  }
}

// DELETE TASK
export function deleteTaskSuccess(id) {
  return {
    type: types.DELETE_TASKS_SUCCESS,
    id
  };
}

export function deleteTask(id) {
  return function (dispatch) {
    return API.fetch({
      method: 'delete',
      url: `${SERVER_URL}${END_POINTS.TASKS}/${id}`,
    })
    .then((response) => {
      dispatch(deleteTaskSuccess(id));
      return response
    })
  }
}

// UPDATE TASK
export function updateTaskSuccess(task) {
  return {
    type: types.UPDATE_TASK_SUCCESS,
    task
  };
}

export function updateTask(id, task) {
  return function (dispatch) {
    return API.fetch({
      method: 'put',
      url: `${SERVER_URL}${END_POINTS.TASKS}/${id}`,
      data: task
    })
    .then((response) => {
      dispatch(updateTaskSuccess(response.data));
      return response
    })
  }
}
