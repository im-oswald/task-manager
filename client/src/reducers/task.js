import {
  GET_TASKS,
  TASK_ERROR,
  DELETE_TASK,
  ADD_TASK,
  UPDATE_TASK,
  SELECT_TASK,
  CLEAR_SELECTED_TASK
} from 'actions/types/task';

const initialState = {
  tasks: [],
  task: {},
  loading: true,
  error: {},
  total: 0,
  tasksPerPage: 0
}

export default function taskReducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_TASKS:
      return { ...state, tasks: payload.tasks, total: payload.totalTasksCount, tasksPerPage: payload.limit, task: {}, loading: false };
    case TASK_ERROR:
      return { ...state, error: payload, loading: false };
    case DELETE_TASK:
      return { ...state, tasks: state.tasks.filter(task => payload.id !== task._id), loading: false };
    case ADD_TASK:
      return { ...state, tasks: [payload, ...state.tasks], loading: false };
    case SELECT_TASK:
      return { ...state, task: state.tasks.find(task => payload.id === task._id), loading: false };
    case CLEAR_SELECTED_TASK:
      return { ...state, task: {}, loading: false };
    case UPDATE_TASK:
      const tasks = state.tasks.map(task => {
        if(task._id === payload._id) {
          return { task, ...payload };
        }
        return task;
      });

      return { ...state, tasks, task: {}, loading: false }
    default:
      return state;
  }
}
