import { REMOVE_ALERT, SET_ALERT } from "actions/types/alert";

const initialState = [];

export default function alertReducer(state = initialState, action) {
  const { payload, type } = action;

  switch(type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload)
    default:
      return state;
  }
}
