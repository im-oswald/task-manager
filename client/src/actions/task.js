import axios from "axios"
import { setAlert } from "./alert";
import {
  GET_TASKS,
  TASK_ERROR,
  DELETE_TASK,
  ADD_TASK,
  UPDATE_TASK,
  SELECT_TASK,
  CLEAR_SELECTED_TASK
} from "./types/task";

export const getTasks = () => async dispatch => {
  try {
    const res = await axios.get('/api/tasks');

    dispatch({ type: GET_TASKS, payload: res.data });
  } catch(err) {
    dispatch({ type: TASK_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const deleteTask = (id) => async dispatch => {
  try {
    await axios.delete(`/api/tasks/${id}`);

    dispatch({ type: DELETE_TASK, payload: { id } });
    dispatch(setAlert('Task deleted', 'success'));
  } catch(err) {
    dispatch(setAlert('Error while deleting task', 'danger'));
    dispatch({ type: TASK_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const addTask = (formData) => async dispatch => {
  try {
    const options = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(formData);

    const res = await axios.post('/api/tasks', body, options);

    dispatch({ type: ADD_TASK, payload: res.data });
    dispatch(setAlert('Task created', 'success'));
  } catch(err) {
    const errors = err.response.data;
    if(errors && errors.length > 0) {
      errors.map((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({ type: TASK_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const updateTask = (id, formData) => async dispatch => {
  try {
    const options = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(formData);

    const res = await axios.put(`/api/tasks/${id}`, body, options);

    dispatch({ type: UPDATE_TASK, payload: res.data });
    dispatch(setAlert('Task updated', 'success'));
  } catch(err) {
    const errors = err.response.data;
    if(errors && errors.length > 0) {
      errors.map((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({ type: TASK_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const selectTask = (id) => async dispatch => {
  dispatch({ type: SELECT_TASK, payload: { id } });
}

export const clearTask = (id) => async dispatch => {
  dispatch({ type: CLEAR_SELECTED_TASK, payload: { id: '' } });
}
